import type { Weather, HourlyWeather } from '../../domain/entities/Weather';
import type { Forecast, ForecastDay, HourlyForecast } from '../../domain/entities/Forecast';
import type { Alert, AlertSeverity } from '../../domain/entities/Alert';
import type { AQI } from '../../domain/entities/AQI';
import { getAQILevel } from '../../domain/entities/AQI';
import type { WeatherApiResponse } from '../schemas/weatherSchema';
import type { ForecastApiResponse } from '../schemas/forecastSchema';
import type { AlertApiResponse } from '../schemas/alertSchema';
import type { AQIApiResponse } from '../schemas/aqiSchema';

export class WeatherMapper {
  static toWeather(data: WeatherApiResponse): Weather {
    return {
      location: data.location.name,
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      temperature: data.current.temp_c,
      feelsLike: data.current.feelslike_c,
      condition: data.current.condition.icon,
      conditionText: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      windDirection: data.current.wind_dir,
      windDegree: data.current.wind_degree,
      pressure: data.current.pressure_mb,
      uv: data.current.uv,
      visibility: data.current.vis_km,
      cloudCover: data.current.cloud,
      isDay: data.current.is_day === 1,
      lastUpdated: new Date(data.current.last_updated),
    };
  }

  static toForecast(data: ForecastApiResponse): Forecast {
    return {
      location: data.location.name,
      days: data.forecast.forecastday.map(this.toForecastDay),
    };
  }

  static toForecastDay(data: any): ForecastDay {
    return {
      date: new Date(data.date),
      maxTemp: data.day.maxtemp_c,
      minTemp: data.day.mintemp_c,
      avgTemp: data.day.avgtemp_c,
      condition: data.day.condition.icon,
      conditionText: data.day.condition.text,
      maxWind: data.day.maxwind_kph,
      totalPrecipitation: data.day.totalprecip_mm,
      avgHumidity: data.day.avghumidity,
      chanceOfRain: data.day.daily_chance_of_rain,
      chanceOfSnow: data.day.daily_chance_of_snow,
      uv: data.day.uv,
      sunrise: data.astro.sunrise,
      sunset: data.astro.sunset,
      moonPhase: data.astro.moon_phase,
      hourly: (data.hour && data.hour.length > 0) ? data.hour.map(this.toHourlyForecast) : [],
    };
  }

  static toHourlyForecast(data: any): HourlyForecast {
    return {
      time: new Date(data.time),
      temperature: data.temp_c,
      feelsLike: data.feelslike_c,
      condition: data.condition.icon,
      conditionText: data.condition.text,
      humidity: data.humidity,
      windSpeed: data.wind_kph,
      windDirection: data.wind_dir,
      chanceOfRain: data.chance_of_rain,
      uv: data.uv,
    };
  }

  static toHourlyWeather(data: any): HourlyWeather {
    return {
      time: new Date(data.time),
      temperature: data.temp_c,
      feelsLike: data.feelslike_c,
      condition: data.condition.icon,
      conditionText: data.condition.text,
      humidity: data.humidity,
      windSpeed: data.wind_kph,
      windDirection: data.wind_dir,
      chanceOfRain: data.chance_of_rain,
      chanceOfSnow: data.chance_of_snow,
      uv: data.uv,
      willItRain: data.will_it_rain === 1,
      willItSnow: data.will_it_snow === 1,
    };
  }

  static toAlert(data: AlertApiResponse): Alert {
    return {
      headline: data.headline,
      severity: data.severity as AlertSeverity,
      urgency: data.urgency,
      areas: data.areas,
      category: data.category,
      certainty: data.certainty,
      event: data.event,
      note: data.note || '',
      effective: new Date(data.effective),
      expires: new Date(data.expires),
      description: data.desc,
      instruction: data.instruction,
    };
  }

  static toAQI(data: AQIApiResponse): AQI {
    const usIndex = data['us-epa-index'];
    return {
      co: data.co,
      no2: data.no2,
      o3: data.o3,
      so2: data.so2,
      pm2_5: data.pm2_5,
      pm10: data.pm10,
      usEpaIndex: usIndex,
      gbDefraIndex: data['gb-defra-index'],
      level: getAQILevel(usIndex),
    };
  }
}
