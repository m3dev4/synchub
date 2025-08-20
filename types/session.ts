export interface Session {
  id: string;
  userId: string;
  ipAddress: string;
  useAgent: string;
  token: string;
  lastActivityAt: Date;
  isOnline: boolean;
  expiresAt: Date;
}
