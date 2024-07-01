import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import router from './router';
import {common} from '@screens/common';

const CommonStack = createNativeStackNavigator();

const CommonNavigation = () => {
  return (
    <CommonStack.Navigator screenOptions={{headerShown: false}}>
      <CommonStack.Screen
        name={router.DETAIL_PLACE_SCREEN}
        component={common[router.DETAIL_PLACE_SCREEN]}
      />
    </CommonStack.Navigator>
  );
};

export default CommonNavigation;
