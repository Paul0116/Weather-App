export interface Weather {
  location: string;
  country: string;
  lat: number;
  lon: number;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionText: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  windDegree: number;
  pressure: number;
  uv: number;
  visibility: number;
  cloudCover: number;
  isDay: boolean;
  lastUpdated: Date;
}

export interface HourlyWeather {
  time: Date;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionText: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  chanceOfRain: number;
  chanceOfSnow: number;
  uv: number;
  willItRain: boolean;
  willItSnow: boolean;
}
