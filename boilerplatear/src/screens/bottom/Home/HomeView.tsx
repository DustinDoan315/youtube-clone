import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hooks';

import {icons} from '@assets/index';
import SearchBar from '@components/SearchBar';
import {Header, PopularCategories, TodaySpecial} from './components';

const HomeView = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.counter);
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar />
      <PopularCategories />
      <TodaySpecial />
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
