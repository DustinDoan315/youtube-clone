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
import Header from '@components/Header';
import ProgressBar from '@components/ProgressBar';
import {color} from '@theme/index';
import {formatTime} from '@utils/helper';
import {width} from '@utils/response';
import {useIsFocused} from '@react-navigation/native';
import {root} from '@navigation/NavigationRef';

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
  const [source, setSource] = useState(sourceVideo);
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setIsPlay(false);
    } else {
      setIsPlay(true);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isFocused]);

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
    <Pressable onPress={handlePlayPause} style={styles.container}>
      <Header handleGoHome={handleGoHome} />
      <Video
        source={source}
        ref={videoRef}
        onError={handleVideoError}
        style={styles.backgroundVideo}
        paused={!isPlay}
        onProgress={onProgress}
        onLoad={onLoad}
        onEnd={() => {
          setCurrentTime(0);
        }}>
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
});

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
