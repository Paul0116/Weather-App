import { z } from 'zod';

export const hourlyForecastSchema = z.object({
  time_epoch: z.number(),
  time: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
  is_day: z.number(),
  condition: z.object({
    text: z.string(),
    icon: z.string(),
    code: z.number(),
  }),
  wind_mph: z.number(),
  wind_kph: z.number(),
  wind_degree: z.number(),
  wind_dir: z.string(),
  pressure_mb: z.number(),
  precip_mm: z.number(),
  humidity: z.number(),
  cloud: z.number(),
  feelslike_c: z.number(),
  will_it_rain: z.number(),
  will_it_snow: z.number(),
  chance_of_rain: z.number(),
  chance_of_snow: z.number(),
  uv: z.number(),
});

export const forecastDaySchema = z.object({
  date: z.string(),
  date_epoch: z.number(),
  day: z.object({
    maxtemp_c: z.number(),
    mintemp_c: z.number(),
    avgtemp_c: z.number(),
    maxwind_mph: z.number(),
    maxwind_kph: z.number(),
    totalprecip_mm: z.number(),
    avghumidity: z.number(),
    daily_will_it_rain: z.number(),
    daily_chance_of_rain: z.number(),
    daily_will_it_snow: z.number(),
    daily_chance_of_snow: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
    uv: z.number(),
  }),
  astro: z.object({
    sunrise: z.string(),
    sunset: z.string(),
    moonrise: z.string(),
    moonset: z.string(),
    moon_phase: z.string(),
    moon_illumination: z.number(),
  }),
  hour: z.array(hourlyForecastSchema),
});

export const forecastSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
  }),
  forecast: z.object({
    forecastday: z.array(forecastDaySchema),
  }),
  alerts: z.object({
    alert: z.array(z.any()),
  }).optional(),
  current: z.object({
    air_quality: z.object({
      co: z.number(),
      no2: z.number(),
      o3: z.number(),
      so2: z.number(),
      pm2_5: z.number(),
      pm10: z.number(),
      'us-epa-index': z.number(),
      'gb-defra-index': z.number(),
    }).optional(),
  }).optional(),
});

export type ForecastApiResponse = z.infer<typeof forecastSchema>;
