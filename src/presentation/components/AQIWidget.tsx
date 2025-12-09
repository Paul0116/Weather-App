import { motion } from 'framer-motion';
import type { AQI } from '../../domain/entities/AQI';
import { getAQIColor } from '../../domain/entities/AQI';
import { Wind, Activity } from 'lucide-react';

interface AQIWidgetProps {
  aqi: AQI;
}

export function AQIWidget({ aqi }: AQIWidgetProps) {
  const pollutants = [
    { name: 'PM2.5', value: aqi.pm2_5.toFixed(1), unit: 'µg/m³' },
    { name: 'PM10', value: aqi.pm10.toFixed(1), unit: 'µg/m³' },
    { name: 'CO', value: aqi.co.toFixed(1), unit: 'µg/m³' },
    { name: 'O₃', value: aqi.o3.toFixed(1), unit: 'µg/m³' },
    { name: 'NO₂', value: aqi.no2.toFixed(1), unit: 'µg/m³' },
    { name: 'SO₂', value: aqi.so2.toFixed(1), unit: 'µg/m³' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-2xl text-white">
          <Wind size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Air Quality
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time monitoring
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              AQI Index
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {aqi.usEpaIndex}
            </p>
          </div>
          <div className={`${getAQIColor(aqi.level)} text-white px-4 py-2 rounded-2xl font-semibold`}>
            {aqi.level}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 to-purple-900 
                        h-3 rounded-full relative mb-2">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-gray-800"
            style={{ left: `${Math.min((aqi.usEpaIndex / 500) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Good</span>
          <span>Hazardous</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {pollutants.map((pollutant, index) => (
          <motion.div
            key={pollutant.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-br from-gray-100/50 to-gray-200/30 dark:from-gray-800/50 dark:to-gray-900/30 
                       rounded-2xl p-4 border border-gray-200/30 dark:border-gray-700/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity size={14} className="text-primary-500" />
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                {pollutant.name}
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {pollutant.value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {pollutant.unit}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
