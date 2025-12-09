import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { HourlyWeather } from '../../domain/entities/Weather';
import { formatTime } from '../../utils/dateUtils';
import { motion } from 'framer-motion';

interface WeatherChartProps {
  data: HourlyWeather[];
}

type MetricType = 'temperature' | 'humidity' | 'wind' | 'rain';

export function WeatherChart({ data }: WeatherChartProps) {
  const [metric, setMetric] = useState<MetricType>('temperature');

  if (!data || data.length === 0) {
    return (
      <div className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Weather Trends
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          No hourly data available. Please check your API key and internet connection.
        </p>
      </div>
    );
  }

  const chartData = data.map((hour) => ({
    time: formatTime(hour.time),
    temperature: Math.round(hour.temperature * 10) / 10,
    humidity: hour.humidity,
    wind: Math.round(hour.windSpeed * 10) / 10,
    rain: hour.chanceOfRain,
  }));

  const metrics = [
    { key: 'temperature', label: 'Temperature', color: '#f59e0b', unit: '°C' },
    { key: 'humidity', label: 'Humidity', color: '#3b82f6', unit: '%' },
    { key: 'wind', label: 'Wind Speed', color: '#8b5cf6', unit: 'km/h' },
    { key: 'rain', label: 'Rain Chance', color: '#06b6d4', unit: '%' },
  ];

  const currentMetric = metrics.find((m) => m.key === metric)!;

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Weather Trends
        </h2>
        
        <div className="flex gap-2">
          {metrics.map((m) => (
            <button
              key={m.key}
              onClick={() => setMetric(m.key as MetricType)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                metric === m.key
                  ? 'bg-primary-500 text-black shadow-lg shadow-primary-500/30'
                  : 'bg-gray-200/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={metric}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          {metric === 'rain' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => [`${value}${currentMetric.unit}`, currentMetric.label]}
              />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={currentMetric.color}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRain)"
                isAnimationActive={true}
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => [`${value}${currentMetric.unit}`, currentMetric.label]}
              />
              <Line
                type="monotone"
                dataKey={metric}
                stroke={currentMetric.color}
                strokeWidth={3}
                dot={{ fill: currentMetric.color, r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
