import router from '@navigation/router';
import HomeScreen from './Home';
import Account from './Account';

export const bottom: any = {
  [router.HOME_SCREEN]: HomeScreen,
  [router.ACCOUNT_SCREEN]: Account,
};
