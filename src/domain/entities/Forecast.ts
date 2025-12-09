export interface ForecastDay {
  date: Date;
  maxTemp: number;
  minTemp: number;
  avgTemp: number;
  condition: string;
  conditionText: string;
  maxWind: number;
  totalPrecipitation: number;
  avgHumidity: number;
  chanceOfRain: number;
  chanceOfSnow: number;
  uv: number;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  hourly: HourlyForecast[];
}

export interface HourlyForecast {
  time: Date;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionText: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  chanceOfRain: number;
  uv: number;
}

export interface Forecast {
  location: string;
  days: ForecastDay[];
}
