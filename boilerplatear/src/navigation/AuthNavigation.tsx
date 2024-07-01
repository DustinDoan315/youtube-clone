import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import router from './router';
import {auth} from '@screens/auth';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name={router.SIGN_IN_SCREEN}
        component={auth[router.SIGN_IN_SCREEN]}
      />
      <AuthStack.Screen
        name={router.SIGN_UP_SCREEN}
        component={auth[router.SIGN_UP_SCREEN]}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
