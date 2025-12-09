import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

interface WindCompassProps {
  windDegree: number;
  windDirection: string;
  windSpeed: number;
}

export function WindCompass({ windDegree, windDirection, windSpeed }: WindCompassProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Wind Direction
      </h3>

      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/10 to-primary-600/5 border-2 border-primary-500/20" />
        
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-100/50 to-gray-200/30 dark:from-gray-800/50 dark:to-gray-900/30" />
        
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">
          N
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">
          S
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">
          W
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">
          E
        </div>

        <motion.div
          animate={{ rotate: windDegree }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-primary-500 text-white p-3 rounded-full shadow-lg">
            <Navigation size={24} />
          </div>
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/5 rounded-2xl p-4 text-center border border-primary-500/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Direction
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {windDirection}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {windDegree}°
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 rounded-2xl p-4 text-center border border-blue-500/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Speed
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(windSpeed)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            km/h
          </p>
        </div>
      </div>
    </motion.div>
  );
}
