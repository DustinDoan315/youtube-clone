import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import SearchBar from '@components/SearchBar';
import {Header, PopularCategories, TodaySpecial} from './components';
import {RootState} from '@redux/store';

const HomeView = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  return (
    <ScrollView style={styles.container}>
      {user.isLoggedIn && <Header />}
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
