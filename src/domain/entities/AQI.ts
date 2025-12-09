export type AQILevel = 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';

export interface AQI {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  usEpaIndex: number;
  gbDefraIndex: number;
  level: AQILevel;
}

export function getAQILevel(index: number): AQILevel {
  if (index <= 50) return 'Good';
  if (index <= 100) return 'Moderate';
  if (index <= 150) return 'Unhealthy for Sensitive';
  if (index <= 200) return 'Unhealthy';
  if (index <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export function getAQIColor(level: AQILevel): string {
  const colors: Record<AQILevel, string> = {
    'Good': 'bg-green-500',
    'Moderate': 'bg-yellow-500',
    'Unhealthy for Sensitive': 'bg-orange-500',
    'Unhealthy': 'bg-red-500',
    'Very Unhealthy': 'bg-purple-500',
    'Hazardous': 'bg-purple-900'
  };
  return colors[level];
}
