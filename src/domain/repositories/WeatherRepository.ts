import type { Weather, HourlyWeather } from '../entities/Weather';
import type { Forecast } from '../entities/Forecast';
import type { Alert } from '../entities/Alert';
import type { AQI } from '../entities/AQI';

export interface WeatherRepository {
  getCurrentWeather(location: string): Promise<Weather>;
  getHourlyWeather(location: string, hours?: number): Promise<HourlyWeather[]>;
  getForecast(location: string, days?: number): Promise<Forecast>;
  getAlerts(location: string): Promise<Alert[]>;
  getAirQuality(location: string): Promise<AQI>;
  searchLocation(query: string): Promise<Array<{ name: string; region: string; country: string; lat: number; lon: number }>>;
}
