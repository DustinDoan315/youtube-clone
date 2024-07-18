/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';

import router from './router';
import {bottom} from '@screens/bottom';
import {color} from '@theme/index';
import {getIcon, screenName} from '@utils/helper';
import BottomSheet from '@components/BottomSheet';
import Create from '@components/Create';
const Tab = createBottomTabNavigator();

const TabButton: React.FC<
  | {
      name: string;
      onPress: () => void;
      accessibilityState: any;
    }
  | any
> = ({name, onPress, accessibilityState, setShowBottomSheet}) => {
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      testID={'bottomBarContainer'}
      onPress={
        name !== screenName.create ? onPress : () => setShowBottomSheet(true)
      }
      style={styles.container}>
      <Image
        source={getIcon(name, focused)}
        style={{
          width: name === screenName.create ? 38 : 24,
          height: name === screenName.create ? 38 : 24,
        }}
      />
      {name !== screenName.create && (
        <Text
          style={{
            color: color.white,
            marginTop: 5,
            fontSize: 10,
          }}>
          {name}
        </Text>
      )}
    </Pressable>
  );
};
const NullComponent = () => null;

const BottomContainer = () => {
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  return (
    <>
      <Tab.Navigator
        initialRouteName={router.HOME_SCREEN}
        backBehavior="initialRoute"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 48,
            paddingBottom: 0,
            backgroundColor: color.dark,
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
          name={router.SHORT_SCREEN}
          component={bottom[router.SHORT_SCREEN]}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props: any) => (
              <TabButton {...props} name={screenName.short} />
            ),
            headerLeft: NullComponent,
          }}
        />
        <Tab.Screen
          name={'3'}
          component={bottom[router.SHORT_SCREEN]}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props: any) => (
              <TabButton
                {...props}
                name={screenName.create}
                setShowBottomSheet={setShowBottomSheet}
              />
            ),
            headerLeft: NullComponent,
          }}
        />
        <Tab.Screen
          name={router.SUBSCRIPTION}
          component={bottom[router.SUBSCRIPTION]}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props: any) => (
              <TabButton {...props} name={screenName.subscription} />
            ),
            headerLeft: NullComponent,
          }}
        />
        <Tab.Screen
          name={router.LIBRARY}
          component={bottom[router.LIBRARY]}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props: any) => (
              <TabButton {...props} name={screenName.library} />
            ),
            headerLeft: NullComponent,
          }}
        />
      </Tab.Navigator>
      {showBottomSheet && (
        <BottomSheet setShowBottomSheet={setShowBottomSheet}>
          <Create setShowBottomSheet={setShowBottomSheet} />
        </BottomSheet>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomContainer;
