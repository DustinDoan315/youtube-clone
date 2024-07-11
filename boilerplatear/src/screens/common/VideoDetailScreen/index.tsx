import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import Header from './components/Header';
import ProgressBar from '@components/ProgressBar';
import {color} from '@theme/index';
import {formatTime} from '@utils/helper';
import {width} from '@utils/response';
import {useIsFocused} from '@react-navigation/native';
import {root} from '@navigation/NavigationRef';
import ActivityIcons from './components/ActivityIcons';

interface VideoDetailScreenProps {
  isFocus: boolean;
  paused?: boolean;
  onPlay?: () => void;
  route: any;
}

const VideoDetailScreen: React.FC<VideoDetailScreenProps> = memo(({route}) => {
  const {sourceVideo} = route?.params;
  const videoRef = useRef<VideoRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const [isHideActivityIcon, setIsHideActivityIcon] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setIsPlay(false);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isFocused]);

  useEffect(() => {
    setIsHideActivityIcon(false);
    const timeoutId = setTimeout(() => {
      setIsHideActivityIcon(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isPlay]);

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
    videoRef.current?.seek(time);
    setIsPlay(true);
  }, []);

  const onProgress = useCallback((data: any) => {
    setCurrentTime(data.currentTime);
  }, []);

  const onLoad = useCallback((data: any) => {
    setDuration(data.duration);
  }, []);

  const handleVideoError = useCallback((error: any) => {
    console.error('Video error:', error);
  }, []);

  const remainingTime = useMemo(
    () => duration - currentTime,
    [duration, currentTime],
  );

  const handlePlayPause = useCallback(() => {
    setIsPlay(prev => !prev);
  }, []);

  const handleGoHome = useCallback(() => {
    setIsPlay(false);
    const timeoutId = setTimeout(() => {
      root.goBack();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header handleGoHome={handleGoHome} />
      </View>

      <Pressable onPress={handlePlayPause}>
        <Video
          source={sourceVideo}
          ref={videoRef}
          onError={handleVideoError}
          style={styles.backgroundVideo}
          paused={!isPlay}
          onProgress={onProgress}
          onLoad={onLoad}
          onEnd={() => setCurrentTime(0)}>
          {!isHideActivityIcon || !isPlay ? (
            <View style={styles.activityIconsContainer}>
              <ActivityIcons isPlay={isPlay} setIsPlay={setIsPlay} />
            </View>
          ) : null}
          <View style={styles.countdownContainer}>
            <Text style={styles.countdown}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>
        </Video>
      </Pressable>

      {duration > 0 && (
        <ProgressBar
          setIsPlay={setIsPlay}
          onTimeUpdate={handleTimeUpdate}
          fullTime={duration}
          currentTime={currentTime}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  backgroundVideo: {
    height: 210,
    width: width,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIconsContainer: {
    zIndex: 100,
    width: '100%',
    alignItems: 'center',
    marginTop: 75,
  },
  countdownContainer: {
    position: 'absolute',
    zIndex: 1000,
    bottom: 10,
    left: 20,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdown: {
    fontSize: 14,
    color: color.white,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default VideoDetailScreen;
