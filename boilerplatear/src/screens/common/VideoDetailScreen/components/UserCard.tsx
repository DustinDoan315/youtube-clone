import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {color} from '@theme/index';
import {icons} from '@assets/index';

const UserCard = () => {
  return (
    <View style={styles.infoContainer}>
      <Pressable style={styles.userInfoContainer}>
        <Image
          style={styles.avatar}
          resizeMode="contain"
          source={icons.avatar}
        />
        <Text style={[styles.subtitle, styles.username]}>Dev With Mee</Text>
        <Text style={[styles.subtitle]}>62.7K</Text>
      </Pressable>

      <Pressable style={styles.bell}>
        <Image
          style={styles.bellIcon}
          resizeMode="contain"
          source={icons.bell}
        />
        <Image
          style={styles.downArrow}
          resizeMode="contain"
          source={icons.down_arrow}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bell: {
    width: 58,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: color.dark_light_1,
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
  },
  bellIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  downArrow: {
    width: 12,
    height: 12,
  },
  username: {
    marginHorizontal: 10,
    color: color.white,
  },
  subscribeButton: {
    width: 78,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: color.bg_subscribe,
  },
  subscribeText: {
    fontSize: 14,
    color: color.white,
  },
  textContainer: {
    maxWidth: '100%',
    marginVertical: 10,
  },
  textSoundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: color.white,
  },
  subtitle: {
    fontSize: 14,
    color: color.secondText,
  },
});

export default UserCard;
