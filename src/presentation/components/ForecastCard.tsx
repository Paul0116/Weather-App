import { motion } from 'framer-motion';
import type { ForecastDay } from '../../domain/entities/Forecast';
import { formatTemperature } from '../../utils/formatters';
import { getRelativeDay, formatMonthDay } from '../../utils/dateUtils';
import { Cloud, CloudRain, CloudSnow, CloudLightning, Sun, CloudDrizzle, Wind, Droplets } from 'lucide-react';

interface ForecastCardProps {
  day: ForecastDay;
  onClick?: () => void;
}

function getWeatherIcon(conditionText: string, size: number = 32) {
  const condition = conditionText.toLowerCase();
  const props = { size };
  
  if (condition.includes('thunder') || condition.includes('storm')) {
    return <CloudLightning {...props} className="text-yellow-500" />;
  }
  if (condition.includes('rain')) {
    return <CloudRain {...props} className="text-blue-500" />;
  }
  if (condition.includes('drizzle')) {
    return <CloudDrizzle {...props} className="text-blue-400" />;
  }
  if (condition.includes('snow')) {
    return <CloudSnow {...props} className="text-blue-300" />;
  }
  if (condition.includes('cloud') || condition.includes('overcast')) {
    return <Cloud {...props} className="text-gray-400" />;
  }
  return <Sun {...props} className="text-yellow-400" />;
}

export function ForecastCard({ day, onClick }: ForecastCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass rounded-3xl p-6 cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 
                      group-hover:from-primary-500/5 group-hover:to-primary-600/10 
                      transition-all duration-300 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">
            {getRelativeDay(day.date)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatMonthDay(day.date)}
          </p>
        </div>

        <div className="flex justify-center mb-4">
          {getWeatherIcon(day.conditionText, 48)}
        </div>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatTemperature(day.maxTemp)}
            </span>
            <span className="text-xl text-gray-500 dark:text-gray-400">
              {formatTemperature(day.minTemp)}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {day.conditionText}
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Droplets size={16} />
              <span>Rain</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {day.chanceOfRain}%
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Wind size={16} />
              <span>Wind</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.round(day.maxWind)} km/h
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
