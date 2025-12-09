import { useUIStore } from '../../application/store/uiStore';

export function useWeatherUI() {
  const {
    theme,
    setTheme,
    temperatureUnit,
    setTemperatureUnit,
    currentLocation,
    setCurrentLocation,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useUIStore();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(temperatureUnit === 'C' ? 'F' : 'C');
  };

  const selectLocation = (location: string) => {
    setCurrentLocation(location);
    addRecentSearch(location);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    temperatureUnit,
    setTemperatureUnit,
    toggleTemperatureUnit,
    currentLocation,
    selectLocation,
    recentSearches,
    clearRecentSearches,
  };
}
