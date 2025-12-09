import type { HourlyWeather } from '../domain/entities/Weather';
import type { Alert } from '../domain/entities/Alert';

export interface StormDetection {
  isStorm: boolean;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  reasons: string[];
  hoursAway: number;
}

export function detectStorm(hourlyData: HourlyWeather[]): StormDetection {
  const reasons: string[] = [];
  let severity: 'low' | 'medium' | 'high' | 'extreme' = 'low';
  let isStorm = false;
  let hoursAway = -1;

  hourlyData.forEach((hour, index) => {
    const isThunderstorm = hour.conditionText.toLowerCase().includes('thunder') ||
                          hour.conditionText.toLowerCase().includes('storm');
    
    const isHeavyRain = hour.chanceOfRain > 70 && hour.conditionText.toLowerCase().includes('rain');
    
    const isStrongWind = hour.windSpeed > 40;
    
    if (isThunderstorm || isHeavyRain || isStrongWind) {
      if (!isStorm) {
        hoursAway = index;
        isStorm = true;
      }
      
      if (isThunderstorm) {
        reasons.push('Thunderstorm detected');
        severity = 'extreme';
      }
      
      if (isHeavyRain) {
        reasons.push(`Heavy rainfall (${hour.chanceOfRain}% chance)`);
        if (severity === 'low') severity = 'high';
      }
      
      if (isStrongWind) {
        reasons.push(`Strong winds (${Math.round(hour.windSpeed)} km/h)`);
        if (severity === 'low') severity = 'medium';
        if (hour.windSpeed > 60) severity = 'extreme';
      }
    }
  });

  return {
    isStorm,
    severity,
    reasons: [...new Set(reasons)],
    hoursAway,
  };
}

export function analyzeAlertSeverity(alerts: Alert[]): {
  hasAlerts: boolean;
  highestSeverity: string;
  count: number;
} {
  if (alerts.length === 0) {
    return { hasAlerts: false, highestSeverity: '', count: 0 };
  }

  const severityOrder = ['Moderate', 'Severe', 'Extreme'];
  const highestSeverity = alerts.reduce((highest, alert) => {
    const currentIndex = severityOrder.indexOf(alert.severity);
    const highestIndex = severityOrder.indexOf(highest);
    return currentIndex > highestIndex ? alert.severity : highest;
  }, 'Moderate');

  return {
    hasAlerts: true,
    highestSeverity,
    count: alerts.length,
  };
}
