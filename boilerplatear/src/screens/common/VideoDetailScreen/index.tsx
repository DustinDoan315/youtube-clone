import React, {memo, useEffect, useRef, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, Image, FlatList} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import Header from './components/Header';
import ProgressBar from '@components/ProgressBar';
import {color} from '@theme/index';
import {formatTime} from '@utils/helper';
import {useIsFocused} from '@react-navigation/native';
import {root} from '@navigation/NavigationRef';
import ActivityIcons from './components/ActivityIcons';
import {icons} from '@assets/index';
import Orientation from 'react-native-orientation-locker';
import Title from './components/Title';
import UserCard from './components/UserCard';
import DescriptionActivityIcons from './components/DescriptionActivityIcons';
import Comments from './components/Comments';
import {VideoHeight} from '@utils/response';
import ListVideo from '@components/ListVideo';

interface VideoDetailScreenProps {
  route: any;
}

const VideoDetailScreen: React.FC<VideoDetailScreenProps> = memo(({route}) => {
  const {sourceVideo, initialVideoIndex} = route?.params;
  const videoRef = useRef<VideoRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHideActivityIcon, setIsHideActivityIcon] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setIsPlay(false);
    }
    return () => {
      videoRef.current?.pause();
    };
  }, [isFocused]);

  useEffect(() => {
    setIsHideActivityIcon(false);
    const timeoutId = setTimeout(() => setIsHideActivityIcon(true), 2000);
    return () => clearTimeout(timeoutId);
  }, [isPlay]);

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
    videoRef.current?.seek(time);
    setIsPlay(true);
  }, []);

  const onProgress = useCallback(
    (data: any) => setCurrentTime(data.currentTime),
    [],
  );

  const onLoad = useCallback((data: any) => setDuration(data.duration), []);

  const handleVideoError = useCallback(
    (error: any) => console.error('Video error:', error),
    [],
  );

  const handlePlayPause = useCallback(() => setIsPlay(prev => !prev), []);

  const handleGoHome = useCallback(() => {
    setIsPlay(false);
    const timeoutId = setTimeout(() => root.goBack(), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleFullScreen = useCallback(() => {
    if (isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  const _renderItem = ({item, index}: any) => {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header handleGoHome={handleGoHome} />
        </View>
        <Pressable onPress={handlePlayPause}>
          <Video
            fullscreen={isFullScreen}
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
              <Pressable onPress={handleFullScreen}>
                <Image
                  source={icons.full_screen}
                  resizeMode="contain"
                  style={styles.fullScreenIcon}
                />
              </Pressable>
            </View>
          </Video>
        </Pressable>

        {duration > 0 && (
          <ProgressBar
            isFullScreen={isFullScreen}
            setIsPlay={setIsPlay}
            onTimeUpdate={handleTimeUpdate}
            fullTime={duration}
            currentTime={currentTime}
          />
        )}
        <Title />
        <UserCard />
        <DescriptionActivityIcons />
        <Comments />
        <ListVideo />
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: color.dark,
      }}>
      <FlatList
        data={[1]}
        renderItem={_renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{height: VideoHeight}} />}
      />
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
    width: '100%',
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
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdown: {
    fontSize: 14,
    color: color.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  fullScreenIcon: {
    width: 16,
    height: 16,
  },
});

export default VideoDetailScreen;
