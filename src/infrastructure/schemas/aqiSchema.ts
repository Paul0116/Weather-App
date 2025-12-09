import { z } from 'zod';

export const aqiSchema = z.object({
  co: z.number(),
  no2: z.number(),
  o3: z.number(),
  so2: z.number(),
  pm2_5: z.number(),
  pm10: z.number(),
  'us-epa-index': z.number(),
  'gb-defra-index': z.number(),
});

export type AQIApiResponse = z.infer<typeof aqiSchema>;
