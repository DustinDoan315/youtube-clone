import router from '@navigation/router';
import HomeScreen from './Home';
import ShortScreen from './Short';

export const bottom: any = {
  [router.HOME_SCREEN]: HomeScreen,
  [router.SHORT_SCREEN]: ShortScreen,
};
