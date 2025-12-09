export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  return `${Math.round(temp)}°${unit}`;
}

export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`;
}

export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

export function formatPrecipitation(precip: number): string {
  return `${precip.toFixed(1)} mm`;
}

export function formatPressure(pressure: number): string {
  return `${Math.round(pressure)} mb`;
}

export function formatVisibility(visibility: number): string {
  return `${visibility.toFixed(1)} km`;
}

export function formatUV(uv: number): string {
  return uv.toFixed(1);
}

export function getUVLevel(uv: number): { level: string; color: string } {
  if (uv <= 2) return { level: 'Low', color: 'text-green-600' };
  if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-600' };
  if (uv <= 7) return { level: 'High', color: 'text-orange-600' };
  if (uv <= 10) return { level: 'Very High', color: 'text-red-600' };
  return { level: 'Extreme', color: 'text-purple-600' };
}
