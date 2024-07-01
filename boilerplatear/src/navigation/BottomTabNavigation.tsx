/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

import router from './router';
import {bottom} from '@screens/bottom';
import {icons} from '@assets/index';
import {screenName} from '@utils/interfaces';
import {color} from '@theme/index';
const Tab = createBottomTabNavigator();

const TabButton: React.FC<
  | {
      name: string;
      onPress: () => void;
      accessibilityState: any;
    }
  | any
> = ({name, onPress, accessibilityState}) => {
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      testID={'bottomBarContainer'}
      onPress={onPress}
      style={styles.container}>
      <Image
        source={
          name === screenName.home
            ? icons.home_focus
            : name === screenName.account && focused
            ? icons.account_focus
            : name === screenName.account
            ? icons.account
            : icons.table
        }
        style={{
          width: 25,
          height: 22,
        }}
      />
      <Text
        style={{
          color: focused ? color.highlight : color.primaryText,
          marginTop: 5,
          fontSize: focused ? 13 : 12,
          fontWeight: focused && 'bold',
        }}>
        {name}
      </Text>
    </Pressable>
  );
};
const NullComponent = () => null;

const BottomContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={router.HOME_SCREEN}
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 78,
          paddingBottom: 8,
          // backgroundColor: 'red',
        },
      }}>
      <Tab.Screen
        name={router.HOME_SCREEN}
        component={bottom[router.HOME_SCREEN]}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props: any) => (
            <TabButton {...props} name={screenName.home} />
          ),
          headerLeft: NullComponent,
        }}
      />

      <Tab.Screen
        name={router.WALLET_SCREEN}
        component={bottom[router.ACCOUNT_SCREEN]}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props: any) => (
            <TabButton {...props} name={screenName.favorite} />
          ),
          headerLeft: NullComponent,
        }}
      />

      <Tab.Screen
        name={router.ACCOUNT_SCREEN}
        component={bottom[router.ACCOUNT_SCREEN]}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props: any) => (
            <TabButton {...props} name={screenName.account} />
          ),
          headerLeft: NullComponent,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default BottomContainer;
