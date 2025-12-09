import { useQuery } from '@tanstack/react-query';
import { WeatherRepositoryImpl } from '../../infrastructure/repositories/WeatherRepositoryImpl';
import { WeatherApiClient } from '../../infrastructure/http/weatherApiClient';

const weatherRepository = new WeatherRepositoryImpl(new WeatherApiClient());

export function useHourlyWeatherQuery(location: string, hours: number = 48) {
  return useQuery({
    queryKey: ['hourlyWeather', location, hours],
    queryFn: () => weatherRepository.getHourlyWeather(location, hours),
    staleTime: 1000 * 60 * 10,
    enabled: !!location,
  });
}

export function useCurrentWeatherQuery(location: string) {
  return useQuery({
    queryKey: ['currentWeather', location],
    queryFn: () => weatherRepository.getCurrentWeather(location),
    staleTime: 1000 * 60 * 5,
    enabled: !!location,
  });
}
