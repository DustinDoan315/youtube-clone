import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {color} from '@theme/index';
import {formatTime} from '@utils/helper';
import {width} from '@utils/response';

const VideoLoading = ({duration = 120}: any) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1000,
          bottom: 10,
          right: 10,
          paddingHorizontal: 8,
          paddingVertical: 6,
          backgroundColor: color.dark_light_1,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.countdown}>{`${formatTime(duration)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.loading,
    height: 210,
    width: width,
  },
  countdown: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
  },
});

export default VideoLoading;
