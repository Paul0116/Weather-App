import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SunsetWidgetProps {
  sunrise: string;
  sunset: string;
}

export function SunsetWidget({ sunrise, sunset }: SunsetWidgetProps) {
  const now = new Date();
  const sunriseDate = parseTime(sunrise);
  const sunsetDate = parseTime(sunset);
  
  const totalMinutes = (sunsetDate.getTime() - sunriseDate.getTime()) / (1000 * 60);
  const elapsedMinutes = Math.max(0, (now.getTime() - sunriseDate.getTime()) / (1000 * 60));
  const progress = Math.min(100, Math.max(0, (elapsedMinutes / totalMinutes) * 100));
  
  const isDaytime = now >= sunriseDate && now <= sunsetDate;
  const remainingMinutes = isDaytime 
    ? (sunsetDate.getTime() - now.getTime()) / (1000 * 60)
    : (sunriseDate.getTime() - now.getTime()) / (1000 * 60);

  function parseTime(timeStr: string): Date {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  function formatRemaining(minutes: number): string {
    const hours = Math.floor(Math.abs(minutes) / 60);
    const mins = Math.floor(Math.abs(minutes) % 60);
    return `${hours}h ${mins}m`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Sun Position
      </h3>

      <div className="relative h-40 mb-6">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path
            d="M 10 90 Q 100 10, 190 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-300 dark:text-gray-700"
          />
          
          <motion.circle
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            cx={10 + (180 * progress) / 100}
            cy={90 - Math.sin((progress / 100) * Math.PI) * 80}
            r="8"
            className="fill-yellow-500"
          >
            <animate
              attributeName="r"
              values="8;10;8"
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.circle>
        </svg>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="bg-orange-500/20 p-3 rounded-2xl inline-block mb-2">
            <Sun size={24} className="text-orange-500" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sunrise</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {sunrise}
          </p>
        </div>

        <div className="text-center">
          <div className="bg-indigo-500/20 p-3 rounded-2xl inline-block mb-2">
            <Moon size={24} className="text-indigo-500" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sunset</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {sunset}
          </p>
        </div>
      </div>

      {remainingMinutes > 0 && (
        <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/5 rounded-2xl p-4 text-center border border-primary-500/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {isDaytime ? 'Until sunset' : 'Until sunrise'}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatRemaining(remainingMinutes)}
          </p>
        </div>
      )}
    </motion.div>
  );
}
