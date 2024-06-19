import RootStack from '@navigation/RootStack';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

export const crimson = 'crimson';
