import React, {memo, useRef} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

import {icons} from '@assets/index';
import {color} from '@theme/index';

const ShortBanner = ({isFocus, paused, index, navigateShortScreen}: any) => {
  const videoRef = useRef<VideoRef>(null);
  console.log('paused', paused);

  const handleVideoError = (error: any) => {
    console.error('Video error:', error);
  };

  return (
    <Pressable
      onPress={() => navigateShortScreen(index)}
      style={styles.container}>
      <Video
        source={index % 2 == 1 ? icons.short_1 : icons.short_2}
        ref={videoRef}
        onError={handleVideoError}
        style={styles.backgroundVideo}
        paused={paused || !isFocus}
        repeat
        resizeMode="stretch"
      />

      <Pressable
        style={{
          position: 'absolute',
          right: 4,
          top: 8,
        }}>
        <Image
          style={{
            width: 16,
            height: 16,
          }}
          resizeMode="contain"
          source={icons.more}
        />
      </Pressable>

      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Config 2022 Opening Keynote - Dylan Field
          </Text>
          <Text style={styles.subtitle}>437K views</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: 158,
    height: 264,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: color.dark,
    marginVertical: 12,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: color.dark,
    overflow: 'hidden',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  textContainer: {
    flex: 1,
    maxWidth: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: color.white,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
    color: color.secondText,
  },
});

export default memo(ShortBanner);
