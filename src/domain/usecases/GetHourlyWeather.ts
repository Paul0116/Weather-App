import type { WeatherRepository } from '../repositories/WeatherRepository';
import type { HourlyWeather } from '../entities/Weather';

export class GetHourlyWeather {
  private repository: WeatherRepository;

  constructor(repository: WeatherRepository) {
    this.repository = repository;
  }

  async execute(location: string, hours: number = 48): Promise<HourlyWeather[]> {
    return this.repository.getHourlyWeather(location, hours);
  }
}
