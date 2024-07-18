import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

import {icons} from '@assets/index';
import {color} from '@theme/index';
import {formatTime} from '@utils/helper';
import {width} from '@utils/response';
import VideoLoading from '@components/VideoLoading';

interface VideoBannerTYpe {
  isFocus?: boolean;
  onPlay?: any;
  navigateVideoScreen?: any;
  isLoading?: boolean;
  sourceVideo?: number | string;
  videoStyle?: any;
  justRenderVideo?: boolean;
  notShowTimeLine?: boolean;
}

const VideoBanner = ({
  isFocus,
  onPlay,
  navigateVideoScreen,
  isLoading,
  sourceVideo,
  videoStyle,
  justRenderVideo,
  notShowTimeLine,
}: VideoBannerTYpe) => {
  const videoRef = useRef<VideoRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);

  useEffect(() => {
    if (!isFocus) {
      videoRef.current?.pause();
      setIsPlay(false);
    } else {
      setIsPlay(true);
    }
  }, [isFocus]);

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
    <Pressable onPress={navigateVideoScreen} style={styles.container}>
      {!isLoading ? (
        <Video
          source={sourceVideo || icons.video_1}
          ref={videoRef}
          onError={handleVideoError}
          style={videoStyle || styles.backgroundVideo}
          paused={!isFocus}
          onProgress={onProgress}
          onLoad={onLoad}
          onEnd={() => {
            setCurrentTime(0);
          }}
          onPlaybackStateChanged={!isPlay && onPlay}>
          {!notShowTimeLine && (
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
              <Text style={styles.countdown}>{`${formatTime(
                remainingTime,
              )}`}</Text>
            </View>
          )}
        </Video>
      ) : (
        <VideoLoading duration={duration} />
      )}

      {!justRenderVideo && (
        <View style={styles.infoContainer}>
          <Image source={icons.avatar} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Config 2022 Opening Keynote - Dylan Field
            </Text>
            <Text style={styles.subtitle}>Figma · 437K views · 7 days ago</Text>
          </View>

          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}>
            <Image
              style={{
                width: 16,
                height: 16,
              }}
              source={icons.more}
            />
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
    marginVertical: 12,
  },
  backgroundVideo: {
    height: 210,
    width: width,
    overflow: 'hidden',
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
    maxWidth: width * 0.8,
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
