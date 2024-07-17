import {View} from 'react-native';
import React from 'react';
import {color} from '@theme/index';
import PlayBack from './components/PlayBack';
import PlayList from './components/PlayList';

const History = () => {
  return (
    <View
      style={{
        flex: 1,
        marginVertical: 12,
        backgroundColor: color.dark,
      }}>
      <PlayBack />
      <PlayList />
    </View>
  );
};

export default History;
