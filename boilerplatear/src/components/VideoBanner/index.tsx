import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

import {icons} from '@assets/index';
import {color} from '@theme/index';
import {formatTime} from '@utils/helper';

const VideoBanner = ({isFocus}: any) => {
  const videoRef = useRef<VideoRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
  };

  const remainingTime = duration - currentTime;

  const handleVideoError = (error: any) => {
    console.error('Video error:', error);
  };

  return (
    <View style={styles.container}>
      <Video
        source={icons.video_1}
        ref={videoRef}
        onError={handleVideoError}
        style={styles.backgroundVideo}
        paused={!isFocus}
        onProgress={onProgress}
        onLoad={onLoad}
        controls>
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
          <Text style={styles.countdown}>{`${formatTime(remainingTime)}`}</Text>
        </View>
      </Video>

      <View style={styles.infoContainer}>
        <Image source={icons.avatar} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Config 2022 Opening Keynote - Dylan Field
          </Text>
          <Text style={styles.subtitle}>Figma · 437K views · 7 days ago</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
  },
  backgroundVideo: {
    height: 210,
  },
  countdown: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: color.white,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
    color: color.secondText,
  },
});

export default VideoBanner;