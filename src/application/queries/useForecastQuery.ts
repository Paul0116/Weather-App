import { useQuery } from '@tanstack/react-query';
import { WeatherRepositoryImpl } from '../../infrastructure/repositories/WeatherRepositoryImpl';
import { WeatherApiClient } from '../../infrastructure/http/weatherApiClient';

const weatherRepository = new WeatherRepositoryImpl(new WeatherApiClient());

export function useForecastQuery(location: string, days: number = 7) {
  return useQuery({
    queryKey: ['forecast', location, days],
    queryFn: () => weatherRepository.getForecast(location, days),
    staleTime: 1000 * 60 * 30,
    enabled: !!location,
  });
}
