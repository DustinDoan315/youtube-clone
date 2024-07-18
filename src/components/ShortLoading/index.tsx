import React from 'react';
import {View, StyleSheet} from 'react-native';

import {color} from '@theme/index';

const ShortLoading = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: color.dark,
    backgroundColor: color.loading,
  },
});

export default ShortLoading;
