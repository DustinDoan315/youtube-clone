import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import {icons} from '@assets/index';
import {color} from '@theme/index';
import Header from './components/Header';
import ActivityIcons from './components/ActivityIcons';
import {useIsFocused} from '@react-navigation/native';

const Short = ({route}: any) => {
  const data = route.params;
  const [isPause, setIsPause] = useState(false);
  const [sourceVideo, setSourceVideo] = useState<any>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setIsPause(true);
      setSourceVideo(null);
    } else {
      setIsPause(false);
      setSourceVideo(data?.sourceVideo || icons.short_2);
    }
  }, [isFocused]);

  const handleVideoError = (error: any) => {
    console.error('Video error:', error);
  };

  const handlePause = () => {
    setIsPause(!isPause);
  };

  return (
    <Pressable onPress={handlePause} style={styles.container}>
      <Video
        source={sourceVideo}
        onError={handleVideoError}
        style={styles.backgroundVideo}
        repeat
        paused={isPause}
        resizeMode="stretch"
      />

      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.activityIconsContainer}>
        <ActivityIcons />
      </View>

      <View style={styles.infoContainer}>
        <Pressable style={styles.userInfoContainer}>
          <Image
            style={styles.avatar}
            resizeMode="contain"
            source={icons.avatar}
          />
          <Text style={[styles.subtitle, styles.username]}>
            @stevenhechinese
          </Text>
          <Pressable style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </Pressable>
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Config 2022 Opening Keynote - Dylan Field
          </Text>
        </View>
        <View style={styles.textSoundContainer}>
          <Image
            style={styles.musicIcon}
            resizeMode="contain"
            source={icons.music}
          />
          <Text style={styles.subtitle}>Original Sound</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Short;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    right: 4,
    top: 8,
  },
  activityIconsContainer: {
    position: 'absolute',
    right: 0,
    bottom: 3,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    maxHeight: 108,
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
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
    fontSize: 12,
    marginTop: 3,
    color: color.secondText,
  },
});
