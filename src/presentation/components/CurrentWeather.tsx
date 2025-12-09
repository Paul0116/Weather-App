import { motion } from 'framer-motion';
import type { Weather } from '../../domain/entities/Weather';
import { formatTemperature, formatWindSpeed, formatHumidity, formatPressure, getUVLevel } from '../../utils/formatters';
import { formatFullDate } from '../../utils/dateUtils';
import { Wind, Droplets, Eye, Gauge, Sun, Cloud } from 'lucide-react';

interface CurrentWeatherProps {
  weather: Weather;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  const uvInfo = getUVLevel(weather.uv);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {weather.location}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {formatFullDate(weather.lastUpdated)}
          </p>
        </div>

        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-7xl font-bold text-gray-900 dark:text-white">
                {formatTemperature(weather.temperature)}
              </span>
              <span className="text-2xl text-gray-600 dark:text-gray-400">
                Feels like {formatTemperature(weather.feelsLike)}
              </span>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 capitalize">
              {weather.conditionText}
            </p>
          </div>

          <div className="text-right">
            <img 
              src={`https:${weather.condition}`} 
              alt={weather.conditionText}
              className="w-24 h-24"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500/20 p-2 rounded-xl">
                <Wind size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatWindSpeed(weather.windSpeed)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {weather.windDirection} • {weather.windDegree}°
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-2xl p-4 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-cyan-500/20 p-2 rounded-xl">
                <Droplets size={20} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatHumidity(weather.humidity)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-500/20 p-2 rounded-xl">
                <Eye size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visibility</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {weather.visibility} km
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 rounded-2xl p-4 border border-indigo-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-500/20 p-2 rounded-xl">
                <Gauge size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPressure(weather.pressure)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-2xl p-4 border border-yellow-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-yellow-500/20 p-2 rounded-xl">
                <Sun size={20} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">UV Index</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {weather.uv}
            </p>
            <p className={`text-xs font-semibold mt-1 ${uvInfo.color}`}>
              {uvInfo.level}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/5 rounded-2xl p-4 border border-gray-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gray-500/20 p-2 rounded-xl">
                <Cloud size={20} className="text-gray-600 dark:text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cloud Cover</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {weather.cloudCover}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
