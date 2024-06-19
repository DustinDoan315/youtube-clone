import router from '@navigation/router';
import HomeScreen from './Home';
import ProfileScreen from './Profile';

export const bottom: any = {
  [router.HOME_SCREEN]: HomeScreen,
  [router.PROFILE_SCREEN]: ProfileScreen,
  [router.WALLET_SCREEN]: ProfileScreen,
};
