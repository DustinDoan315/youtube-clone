import router from '@navigation/router';
import HomeScreen from './Home';
import ShortScreen from './Short';
import Subscriptions from './Subscriptions';
import Library from './Library';

export const bottom: any = {
  [router.HOME_SCREEN]: HomeScreen,
  [router.SHORT_SCREEN]: ShortScreen,
  [router.SUBSCRIPTION]: Subscriptions,
  [router.LIBRARY]: Library,
};
