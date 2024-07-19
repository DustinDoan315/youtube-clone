import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {color} from '@theme/index';
import {icons} from '@assets/index';

const ChannelInfo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={icons.avatar_2}
        resizeMode="contain"
        style={styles.avatar}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.channelName}>Dev with mee</Text>
        <Text style={styles.handle}>@devwithmee</Text>
        <Text style={styles.subscribers}>372K subscribers</Text>

        <Pressable style={styles.subscribeButton}>
          <Image
            source={icons.bell_muted}
            resizeMode="contain"
            style={styles.bellIcon}
          />
          <Text style={styles.subscribeText}>Subscribed</Text>
          <Image
            source={icons.down_arrow}
            resizeMode="contain"
            style={styles.downArrowIcon}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 122,
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.primaryText,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: 68,
    height: 68,
  },
  infoContainer: {
    marginLeft: 50,
  },
  channelName: {
    fontSize: 16,
    color: color.white,
  },
  handle: {
    fontSize: 12,
    color: color.primaryBorder,
    marginVertical: 3,
  },
  subscribers: {
    fontSize: 12,
    color: color.primaryBorder,
  },
  subscribeButton: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 131,
    height: 32,
    borderRadius: 32,
    backgroundColor: color.primaryText,
  },
  bellIcon: {
    width: 18,
    height: 18,
  },
  subscribeText: {
    fontSize: 12,
    color: color.white,
    marginHorizontal: 5,
  },
  downArrowIcon: {
    width: 12,
    height: 12,
  },
});

export default ChannelInfo;
