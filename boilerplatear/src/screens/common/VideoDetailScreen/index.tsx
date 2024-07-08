import React, {memo, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import Header from '@components/Header';
import ProgressBar from '@components/ProgressBar';
import {color} from '@theme/index';
import {formatTime} from '@utils/helper';
import {width} from '@utils/response';

interface VideoDetailScreenProps {
  isFocus: boolean;
  paused: boolean;
  onPlay: () => void;
  route: any;
}

const VideoDetailScreen: React.FC<VideoDetailScreenProps> = memo(
  ({isFocus, paused, onPlay, route}) => {
    const {sourceVideo} = route?.params;
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

    const handleTimeUpdate = (time: number) => {
      setCurrentTime(time);
      videoRef.current?.seek(time);
      setIsPlay(false);
    };

    const onProgress = (data: any) => {
      setCurrentTime(data.currentTime);
    };

    const onLoad = (data: any) => {
      setDuration(data.duration);
    };

    const handleVideoError = (error: any) => {
      console.error('Video error:', error);
    };

    const remainingTime = duration - currentTime;

    const handlePlayPause = () => {
      setIsPlay(!isPlay);
    };

    return (
      <Pressable onPress={handlePlayPause} style={styles.container}>
        <Header />
        <Video
          source={sourceVideo}
          ref={videoRef}
          onError={handleVideoError}
          style={styles.backgroundVideo}
          paused={paused || !isPlay}
          onProgress={onProgress}
          onLoad={onLoad}
          onEnd={() => {
            setCurrentTime(0);
          }}
          onPlaybackStateChanged={!isPlay ? onPlay : () => {}}>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdown}>{formatTime(remainingTime)}</Text>
          </View>
          {duration > 0 && (
            <ProgressBar
              setIsPlay={setIsPlay}
              onTimeUpdate={handleTimeUpdate}
              fullTime={duration}
              currentTime={currentTime}
            />
          )}
        </Video>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
  },
  backgroundVideo: {
    height: 210,
    width: width,
    overflow: 'hidden',
  },
  countdownContainer: {
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
  },
  countdown: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
  },
});

export default VideoDetailScreen;
