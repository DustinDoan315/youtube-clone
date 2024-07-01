import router from '@navigation/router';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

export const auth = {
  [router.SIGN_IN_SCREEN]: SignInScreen,
  [router.SIGN_UP_SCREEN]: SignUpScreen,
};
