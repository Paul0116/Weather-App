import { BaseHttpClient } from './baseClient';

export class WeatherApiClient extends BaseHttpClient {
  constructor() {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY || 'demo';
    const baseURL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';
    super(baseURL, apiKey);
  }

  async getCurrentWeather(location: string) {
    return this.get('/current.json', { q: location, aqi: 'yes' });
  }

  async getForecast(location: string, days: number = 7) {
    return this.get('/forecast.json', { 
      q: location, 
      days, 
      aqi: 'yes', 
      alerts: 'yes'
    });
  }

  async getFutureForecast(location: string, date: string) {
    return this.get('/future.json', { 
      q: location, 
      dt: date
    });
  }

  async searchLocation(query: string) {
    return this.get('/search.json', { q: query });
  }

  async getAstronomy(location: string, date?: string) {
    return this.get('/astronomy.json', { q: location, dt: date });
  }
}
