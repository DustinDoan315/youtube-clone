export const screenName = {
  home: 'Home',
  favorite: 'Favorite',
  booking: 'Booking',
  account: 'Account',
};
export interface UserState {
  previousEmail: string;
  name: string;
  email?: string;
  password: string;
  isLoggedIn: boolean;
}
