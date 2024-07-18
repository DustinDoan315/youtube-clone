import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {common} from '@screens/common';
import router from './router';

const CommonStack = createNativeStackNavigator();

const CommonNavigation = () => {
  return (
    <CommonStack.Navigator screenOptions={{headerShown: false}}>
      <CommonStack.Screen
        name={router.VIDEO_DETAIL_SCREEN}
        component={common[router.VIDEO_DETAIL_SCREEN]}
      />
    </CommonStack.Navigator>
  );
};

export default CommonNavigation;
