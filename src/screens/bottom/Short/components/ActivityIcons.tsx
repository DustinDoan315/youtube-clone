import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';

const ActivityIcons = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Image source={icons.like} resizeMode="contain" style={[styles.icon]} />
        <Text style={styles.iconText}>Like</Text>
      </Pressable>
      <Pressable>
        <Image
          source={icons.dislike}
          resizeMode="contain"
          style={styles.icon}
        />
        <Text style={styles.iconText}>Dislike</Text>
      </Pressable>
      <Pressable>
        <Image
          source={icons.comment}
          resizeMode="contain"
          style={[styles.icon]}
        />
        <Text style={styles.iconText}>106</Text>
      </Pressable>
      <Pressable>
        <Image
          source={icons.share}
          resizeMode="contain"
          style={[styles.icon]}
        />
        <Text style={styles.iconText}>Share</Text>
      </Pressable>
      <Pressable>
        <Image
          source={icons.remix}
          resizeMode="contain"
          style={[styles.icon]}
        />
        <Text style={styles.iconText}>Remix</Text>
      </Pressable>

      <Pressable>
        <Image
          source={icons.soundImage}
          resizeMode="contain"
          style={[styles.icon, {width: 45, height: 45}]}
        />
      </Pressable>
    </View>
  );
};

export default ActivityIcons;

const styles = StyleSheet.create({
  container: {
    width: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 24,
  },
  iconText: {
    fontSize: 12,
    color: color.white,
  },
});
