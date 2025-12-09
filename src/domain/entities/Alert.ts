export type AlertSeverity = 'Moderate' | 'Severe' | 'Extreme';

export interface Alert {
  headline: string;
  severity: AlertSeverity;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: Date;
  expires: Date;
  description: string;
  instruction: string;
}
