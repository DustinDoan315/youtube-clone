export interface UserState {
  previousEmail: string;
  name: string;
  email?: string;
  password: string;
  isLoggedIn: boolean;
}

export interface VideoState {
  videoIndex: number | null;
  shortIndex: number | null;
}
