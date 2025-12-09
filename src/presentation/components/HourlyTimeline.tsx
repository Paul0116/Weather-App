import { motion } from 'framer-motion';
import type { HourlyWeather } from '../../domain/entities/Weather';
import { formatTemperature, formatWindSpeed } from '../../utils/formatters';
import { formatTime } from '../../utils/dateUtils';
import { Cloud, CloudRain, CloudSnow, CloudLightning, Sun, CloudDrizzle, Wind } from 'lucide-react';

interface HourlyTimelineProps {
  data: HourlyWeather[];
}

function getWeatherIcon(conditionText: string, size: number = 24) {
  const condition = conditionText.toLowerCase();
  const props = { size, className: 'text-primary-500' };
  
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
  if (condition.includes('wind')) {
    return <Wind {...props} className="text-gray-500" />;
  }
  if (condition.includes('cloud') || condition.includes('overcast')) {
    return <Cloud {...props} className="text-gray-400" />;
  }
  return <Sun {...props} className="text-yellow-400" />;
}

export function HourlyTimeline({ data }: HourlyTimelineProps) {
  if (!data || data.length === 0) {
    return (
      <div className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          48-Hour Forecast
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No hourly forecast data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        48-Hour Forecast
      </h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {data.map((hour, index) => (
          <motion.div
            key={hour.time.toISOString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="flex-shrink-0 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 
                       rounded-2xl p-4 min-w-[100px] text-center border border-gray-200/30 dark:border-gray-700/30
                       hover:scale-105 transition-transform cursor-pointer"
          >
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {formatTime(hour.time)}
            </p>
            
            <div className="flex justify-center mb-3">
              {getWeatherIcon(hour.conditionText, 32)}
            </div>
            
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {formatTemperature(hour.temperature)}
            </p>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {hour.conditionText}
            </p>
            
            <div className="space-y-1 mt-3 text-xs">
              <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                <CloudRain size={12} />
                <span>{hour.chanceOfRain}%</span>
              </div>
              
              <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                <Wind size={12} />
                <span>{formatWindSpeed(hour.windSpeed)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
