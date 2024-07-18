import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color} from '@theme/index';

const Title = React.memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Build your design system - Lesson 3 : Introduction to design systems
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>270K views 3 days ago Config 2024</Text>
        <Text style={styles.moreText}>...more</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  titleText: {
    fontSize: 18,
    color: color.white,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: color.secondText,
    marginTop: 7,
  },
  moreText: {
    marginLeft: 8,
    fontSize: 12,
    color: color.white,
    marginTop: 7,
  },
});

export default Title;
