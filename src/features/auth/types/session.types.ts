export interface AuthSession {
  accessToken: string;
  refreshToken: string;
}

export interface SupabaseUser {
  user_metadata?: {
    name?: string;
    job_title?: string;
  };
}
