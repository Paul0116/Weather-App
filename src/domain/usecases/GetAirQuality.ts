import type { WeatherRepository } from '../repositories/WeatherRepository';
import type { AQI } from '../entities/AQI';

export class GetAirQuality {
  private repository: WeatherRepository;

  constructor(repository: WeatherRepository) {
    this.repository = repository;
  }

  async execute(location: string): Promise<AQI> {
    return this.repository.getAirQuality(location);
  }
}
