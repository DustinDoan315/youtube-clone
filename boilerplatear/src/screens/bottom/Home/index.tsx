import {ScrollView} from 'react-native';
import React from 'react';
import HomeView from './HomeView';
import {styles} from './style';

const HomeScreen = () => {
  return <ScrollView style={styles.container}>{<HomeView />}</ScrollView>;
};

export default HomeScreen;
