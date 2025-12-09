import { z } from 'zod';

export const alertSchema = z.object({
  headline: z.string(),
  msgtype: z.string().optional(),
  severity: z.string(),
  urgency: z.string(),
  areas: z.string(),
  category: z.string(),
  certainty: z.string(),
  event: z.string(),
  note: z.string().optional(),
  effective: z.string(),
  expires: z.string(),
  desc: z.string(),
  instruction: z.string(),
});

export type AlertApiResponse = z.infer<typeof alertSchema>;
