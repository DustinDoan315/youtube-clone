import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import SearchBar from '@components/SearchBar';
import {Header, PopularCategories, TodaySpecial} from './components';

const HomeView = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.counter);
  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar />
      <PopularCategories />
      <TodaySpecial />
    </ScrollView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
