import { useState, useEffect } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import { useSearchLocationsQuery } from '../../application/queries/useAlertsQuery';
import { useUIStore } from '../../application/store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentLocation, addRecentSearch, recentSearches } = useUIStore();
  const { data: locations, isLoading } = useSearchLocationsQuery(query);

  const handleSelectLocation = (location: string) => {
    setCurrentLocation(location);
    addRecentSearch(location);
    setQuery('');
    setIsOpen(false);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
          setCurrentLocation(locationString);
          addRecentSearch(locationString);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  useEffect(() => {
    setIsOpen(query.length >= 3);
  }, [query]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search city or country..."
          className="w-full glass rounded-2xl pl-12 pr-12 py-4 text-gray-900 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400
                     focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={handleGeolocation}
            className="bg-primary-500 text-white p-2 rounded-xl hover:bg-primary-600 transition-colors"
            title="Use current location"
          >
            <MapPin size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 glass rounded-2xl shadow-2xl overflow-hidden"
          >
            {query.length >= 3 ? (
              <div className="max-h-80 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="animate-spin text-primary-500" size={24} />
                  </div>
                ) : locations && locations.length > 0 ? (
                  <div>
                    {locations.map((location, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectLocation(location.name)}
                        className="w-full text-left px-6 py-4 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 
                                   transition-colors border-b border-gray-200/30 dark:border-gray-700/30 last:border-0"
                      >
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {location.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {location.region}, {location.country}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No locations found
                  </div>
                )}
              </div>
            ) : recentSearches.length > 0 ? (
              <div>
                <div className="px-6 py-3 border-b border-gray-200/30 dark:border-gray-700/30">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Recent Searches
                  </p>
                </div>
                {recentSearches.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLocation(location)}
                    className="w-full text-left px-6 py-4 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 
                               transition-colors border-b border-gray-200/30 dark:border-gray-700/30 last:border-0"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {location}
                    </p>
                  </button>
                ))}
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
