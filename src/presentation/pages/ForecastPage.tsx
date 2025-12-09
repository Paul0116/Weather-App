import { useState } from 'react';
import { useUIStore } from '../../application/store/uiStore';
import { useForecastQuery } from '../../application/queries/useForecastQuery';
import { ForecastCard } from '../components/ForecastCard';
import { HourlyTimeline } from '../components/HourlyTimeline';
import { ArrowLeft } from 'lucide-react';
import { ForecastCardSkeleton, HourlyTimelineSkeleton } from '../components/SkeletonLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ForecastDay } from '../../domain/entities/Forecast';

export function ForecastPage() {
  const { currentLocation } = useUIStore();
  const { data: forecast, isLoading } = useForecastQuery(currentLocation, 7);
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link 
            to="/"
            className="glass p-3 rounded-2xl hover:shadow-lg transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              7-Day Forecast
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {forecast?.location}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {isLoading ? (
            [...Array(7)].map((_, i) => <ForecastCardSkeleton key={i} />)
          ) : (
            forecast && forecast.days.map((day, index) => (
              <ForecastCard
                key={index}
                day={day}
                onClick={() => setSelectedDay(selectedDay?.date === day.date ? null : day)}
              />
            ))
          )}
        </div>

        {forecast && selectedDay && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay.date.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-3xl p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Hourly Breakdown
              </h2>
              <HourlyTimeline data={selectedDay.hourly.map(h => ({
                ...h,
                windDirection: 'N',
                chanceOfSnow: 0,
                willItRain: false,
                willItSnow: false,
              }))} />
            </motion.div>
          </AnimatePresence>
        )}

        {forecast && (
          <div className="glass rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Detailed Forecast
            </h2>
            <div className="space-y-4">
              {forecast.days.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-br from-gray-100/50 to-gray-200/30 dark:from-gray-800/50 dark:to-gray-900/30 
                               rounded-2xl p-6 border border-gray-200/30 dark:border-gray-700/30"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Date
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {day.date.toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Temperature Range
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Precipitation
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {day.chanceOfRain}% • {day.totalPrecipitation.toFixed(1)}mm
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Wind & Humidity
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {Math.round(day.maxWind)} km/h • {day.avgHumidity}%
                        </p>
                      </div>
                    </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
