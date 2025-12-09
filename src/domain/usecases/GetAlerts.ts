import type { WeatherRepository } from '../repositories/WeatherRepository';
import type { Alert } from '../entities/Alert';

export class GetAlerts {
  private repository: WeatherRepository;

  constructor(repository: WeatherRepository) {
    this.repository = repository;
  }

  async execute(location: string): Promise<Alert[]> {
    return this.repository.getAlerts(location);
  }
}
