export interface HelpRequest {
  id: number;
  title: string;
  description: string;
  fulfilled: boolean;
  expirationDate: string;
  durationInHours: number;
  location: string;
}
