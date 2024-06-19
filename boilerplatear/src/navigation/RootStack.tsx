import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';

import {navigationRef} from './NavigationRef';
import BottomContainer from './BottomTabNavigation';
import CommonContainer from './CommonContainer';
import router from './router';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={router.BOTTOM_CONTAINER}
          component={BottomContainer}
          options={{gestureEnabled: false}}
        />

        <Stack.Screen
          name={router.COMMON_CONTAINER}
          component={CommonContainer}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
