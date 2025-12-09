import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type TemperatureUnit = 'C' | 'F';

interface UIState {
  theme: Theme;
  temperatureUnit: TemperatureUnit;
  currentLocation: string;
  recentSearches: string[];
  isLocationDetected: boolean;
  setTheme: (theme: Theme) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setCurrentLocation: (location: string) => void;
  addRecentSearch: (location: string) => void;
  clearRecentSearches: () => void;
  setIsLocationDetected: (detected: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      temperatureUnit: 'C',
      currentLocation: 'London',
      recentSearches: [],
      isLocationDetected: false,
      
      setTheme: (theme) => {
        set({ theme });
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
      
      setCurrentLocation: (location) => set({ currentLocation: location }),
      
      addRecentSearch: (location) =>
        set((state) => ({
          recentSearches: [
            location,
            ...state.recentSearches.filter((l) => l !== location),
          ].slice(0, 5),
        })),
      
      clearRecentSearches: () => set({ recentSearches: [] }),
      
      setIsLocationDetected: (detected) => set({ isLocationDetected: detected }),
    }),
    {
      name: 'weather-ui-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          const isDark = state.theme === 'dark' || (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
    }
  )
);
