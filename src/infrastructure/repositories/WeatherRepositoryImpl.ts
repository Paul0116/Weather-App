import type { WeatherRepository } from '../../domain/repositories/WeatherRepository';
import type { Weather, HourlyWeather } from '../../domain/entities/Weather';
import type { Forecast } from '../../domain/entities/Forecast';
import type { Alert } from '../../domain/entities/Alert';
import type { AQI } from '../../domain/entities/AQI';
import { WeatherApiClient } from '../http/weatherApiClient';
import { WeatherMapper } from '../mappers/weatherMapper';
import { weatherSchema } from '../schemas/weatherSchema';
import { forecastSchema } from '../schemas/forecastSchema';

export class WeatherRepositoryImpl implements WeatherRepository {
  private apiClient: WeatherApiClient;
  
  constructor(apiClient: WeatherApiClient) {
    this.apiClient = apiClient;
  }

  async getCurrentWeather(location: string): Promise<Weather> {
    const data = await this.apiClient.getCurrentWeather(location);
    const validated = weatherSchema.parse(data);
    return WeatherMapper.toWeather(validated);
  }

  async getHourlyWeather(location: string, hours: number = 48): Promise<HourlyWeather[]> {
    const days = Math.ceil(hours / 24);
    const data = await this.apiClient.getForecast(location, days);
    const validated = forecastSchema.parse(data);
    
    const allHours: HourlyWeather[] = [];
    
    validated.forecast.forecastday.forEach((day) => {
      if (day.hour && day.hour.length > 0) {
        day.hour.forEach((hour) => {
          allHours.push(WeatherMapper.toHourlyWeather(hour));
        });
      } else {
        for (let hour = 0; hour < 24; hour++) {
          const dayDate = new Date(day.date);
          dayDate.setHours(hour);
          
          const tempRange = day.day.maxtemp_c - day.day.mintemp_c;
          const tempOffset = Math.sin((hour - 6) * Math.PI / 12) * (tempRange / 2);
          const hourTemp = day.day.avgtemp_c + tempOffset;
          
          allHours.push({
            time: new Date(dayDate),
            temperature: Math.round(hourTemp * 10) / 10,
            feelsLike: Math.round((hourTemp - 2) * 10) / 10,
            condition: day.day.condition.icon,
            conditionText: day.day.condition.text,
            humidity: day.day.avghumidity,
            windSpeed: day.day.maxwind_kph * (0.7 + Math.random() * 0.3),
            windDirection: 'N',
            chanceOfRain: day.day.daily_chance_of_rain,
            chanceOfSnow: day.day.daily_chance_of_snow || 0,
            uv: day.day.uv,
            willItRain: day.day.daily_will_it_rain === 1,
            willItSnow: (day.day.daily_will_it_snow || 0) === 1,
          });
        }
      }
    });
    
    return allHours.slice(0, hours);
  }

  async getForecast(location: string, days: number = 7): Promise<Forecast> {
    const data = await this.apiClient.getForecast(location, days);
    const validated = forecastSchema.parse(data);
    return WeatherMapper.toForecast(validated);
  }

  async getAlerts(location: string): Promise<Alert[]> {
    const data = await this.apiClient.getForecast(location, 1);
    const validated = forecastSchema.parse(data);
    
    if (!validated.alerts?.alert || validated.alerts.alert.length === 0) {
      return [];
    }
    
    return validated.alerts.alert.map((alert) => WeatherMapper.toAlert(alert));
  }

  async getAirQuality(location: string): Promise<AQI> {
    const data = await this.apiClient.getForecast(location, 1);
    const validated = forecastSchema.parse(data);
    
    if (!validated.current?.air_quality) {
      throw new Error('Air quality data not available');
    }
    
    return WeatherMapper.toAQI(validated.current.air_quality);
  }

  async searchLocation(query: string): Promise<Array<{ name: string; region: string; country: string; lat: number; lon: number }>> {
    const data: any = await this.apiClient.searchLocation(query);
    return data.map((item: any) => ({
      name: item.name,
      region: item.region,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
    }));
  }
}
