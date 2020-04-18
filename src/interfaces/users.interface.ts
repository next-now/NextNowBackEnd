export interface User {
  id: number;
  email: string;
  password: string;
  walletId: string;
  username: string;
  giverProfileActive: boolean;
  hasCar: boolean;
  availabilityStartTime?: string;
  availabilityEndTime?: string;
  address?: string;
  lat?: number;
  lon?: number;
}
