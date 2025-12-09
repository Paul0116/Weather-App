import { useQuery } from '@tanstack/react-query';
import { WeatherRepositoryImpl } from '../../infrastructure/repositories/WeatherRepositoryImpl';
import { WeatherApiClient } from '../../infrastructure/http/weatherApiClient';

const weatherRepository = new WeatherRepositoryImpl(new WeatherApiClient());

export function useAlertsQuery(location: string) {
  return useQuery({
    queryKey: ['alerts', location],
    queryFn: () => weatherRepository.getAlerts(location),
    staleTime: 1000 * 60 * 15,
    enabled: !!location,
  });
}

export function useAirQualityQuery(location: string) {
  return useQuery({
    queryKey: ['airQuality', location],
    queryFn: () => weatherRepository.getAirQuality(location),
    staleTime: 1000 * 60 * 30,
    enabled: !!location,
  });
}

export function useSearchLocationsQuery(query: string) {
  return useQuery({
    queryKey: ['searchLocations', query],
    queryFn: () => weatherRepository.searchLocation(query),
    staleTime: 1000 * 60 * 60,
    enabled: query.length >= 3,
  });
}
