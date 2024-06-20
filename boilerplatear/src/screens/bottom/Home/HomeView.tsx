import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {decrement, increment} from '@redux/features/counter/counterSlice';

const HomeView = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.counter);

  console.log('HomeView-----: ', data);

  const add = () => {
    dispatch(increment());
  };

  const minus = () => {
    dispatch(decrement());
  };
  return (
    <View>
      <Text>HomeView</Text>

      <Button title="Click me" onPress={add}></Button>
      <Button title="Click me" onPress={minus}></Button>
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({});
