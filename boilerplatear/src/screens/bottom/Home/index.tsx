/* eslint-disable react-native/no-inline-styles */
import {ScrollView} from 'react-native';
import React from 'react';

import {styles} from './style';
import {MyWallet} from './HomeViewModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListAccess} from './components';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={styles.container}>
        {MyWallet()}
        <ListAccess />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
