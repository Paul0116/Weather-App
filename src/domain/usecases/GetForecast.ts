import type { WeatherRepository } from '../repositories/WeatherRepository';
import type { Forecast } from '../entities/Forecast';

export class GetForecast {
  private repository: WeatherRepository;

  constructor(repository: WeatherRepository) {
    this.repository = repository;
  }

  async execute(location: string, days: number = 7): Promise<Forecast> {
    return this.repository.getForecast(location, days);
  }
}
