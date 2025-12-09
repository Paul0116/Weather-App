import { useUIStore } from '../../application/store/uiStore';
import { useCurrentWeatherQuery, useHourlyWeatherQuery } from '../../application/queries/useHourlyWeatherQuery';
import { useForecastQuery } from '../../application/queries/useForecastQuery';
import { useAlertsQuery, useAirQualityQuery } from '../../application/queries/useAlertsQuery';
import { CurrentWeather } from '../components/CurrentWeather';
import { HourlyTimeline } from '../components/HourlyTimeline';
import { WeatherChart } from '../components/WeatherChart';
import { AlertBanner } from '../components/AlertBanner';
import { ForecastCard } from '../components/ForecastCard';
import { AQIWidget } from '../components/AQIWidget';
import { SunsetWidget } from '../components/SunsetWidget';
import { WindCompass } from '../components/WindCompass';
import { SearchBar } from '../components/SearchBar';
import { AlertTriangle } from 'lucide-react';
import { CurrentWeatherSkeleton, HourlyTimelineSkeleton, WeatherChartSkeleton, ForecastCardSkeleton, AQIWidgetSkeleton, SunsetWidgetSkeleton, WindCompassSkeleton } from '../components/SkeletonLoader';
import { motion } from 'framer-motion';
import { detectStorm } from '../../utils/detectStorm';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { currentLocation } = useUIStore();
  
  const { data: currentWeather, isLoading: weatherLoading, error: weatherError } = useCurrentWeatherQuery(currentLocation);
  const { data: hourlyData, isLoading: hourlyLoading } = useHourlyWeatherQuery(currentLocation, 48);
  const { data: forecast, isLoading: forecastLoading } = useForecastQuery(currentLocation, 7);
  const { data: alerts } = useAlertsQuery(currentLocation);
  const { data: aqi } = useAirQualityQuery(currentLocation);

  const stormDetection = hourlyData ? detectStorm(hourlyData) : null;
  const isLoading = weatherLoading || hourlyLoading || forecastLoading;

  if (weatherError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass rounded-3xl p-8 max-w-md text-center">
          <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Unable to Load Weather
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please check your API key in the .env file or try another location.
          </p>
          <SearchBar />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Weather Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time weather updates and forecasts
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar />
        </div>

        {stormDetection?.isStorm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className={`glass rounded-3xl p-6 border-2 ${
              stormDetection.severity === 'extreme' ? 'border-red-500' :
              stormDetection.severity === 'high' ? 'border-orange-500' :
              'border-yellow-500'
            }`}>
              <div className="flex items-center gap-4">
                <AlertTriangle className={`${
                  stormDetection.severity === 'extreme' ? 'text-red-500' :
                  stormDetection.severity === 'high' ? 'text-orange-500' :
                  'text-yellow-500'
                }`} size={32} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Storm Alert Detected
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Expected in {stormDetection.hoursAway} hours • {stormDetection.reasons.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {alerts && alerts.length > 0 && (
          <div className="mb-8">
            <AlertBanner alerts={alerts} />
          </div>
        )}

        <div className="mb-8">
          {isLoading ? <CurrentWeatherSkeleton /> : currentWeather && <CurrentWeather weather={currentWeather} />}
        </div>

        <div className="mb-8">
          {isLoading ? <HourlyTimelineSkeleton /> : <HourlyTimeline data={hourlyData || []} />}
        </div>

        <div className="mb-8">
          {isLoading ? <WeatherChartSkeleton /> : hourlyData && hourlyData.length > 0 && <WeatherChart data={hourlyData.slice(0, 24)} />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            {isLoading ? <AQIWidgetSkeleton /> : aqi && <AQIWidget aqi={aqi} />}
          </div>
          <div className="space-y-8">
            {isLoading ? (
              <>
                <SunsetWidgetSkeleton />
                <WindCompassSkeleton />
              </>
            ) : (
              <>
                {forecast && forecast.days.length > 0 && (
                  <SunsetWidget 
                    sunrise={forecast.days[0].sunrise} 
                    sunset={forecast.days[0].sunset} 
                  />
                )}
                {currentWeather && (
                  <WindCompass
                    windDegree={currentWeather.windDegree}
                    windDirection={currentWeather.windDirection}
                    windSpeed={currentWeather.windSpeed}
                  />
                )}
              </>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              7-Day Forecast
            </h2>
            <Link 
              to="/forecast"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              View Details →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {isLoading ? (
              [...Array(7)].map((_, i) => <ForecastCardSkeleton key={i} />)
            ) : (
              forecast && forecast.days.map((day, index) => (
                <ForecastCard key={index} day={day} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
