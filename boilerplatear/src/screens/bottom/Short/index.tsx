import React, {useEffect, useState, useRef, useCallback} from 'react';
import {FlatList, View, Pressable, Image, StyleSheet, Text} from 'react-native';
import Video from 'react-native-video';
import {icons} from '@assets/index';
import {color} from '@theme/index';
import Header from './components/Header';
import ActivityIcons from './components/ActivityIcons';
import {useIsFocused} from '@react-navigation/native';
import {height, width} from '@utils/response';

const Short = ({route}: any) => {
  const data = [
    {
      sourceVideo: route?.params?.sourceVideo || icons.short_1,
    },
    {
      sourceVideo: icons.short_2,
    },
    {
      sourceVideo: icons.short_1,
    },
  ];
  const [isPause, setIsPause] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState<any[]>([]);
  const isFocused = useIsFocused();
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    if (!isFocused) {
      setIsPause(true);
      setPaused(data.map(() => true));
      flatListRef.current?.scrollToOffset({animated: false, offset: 0});
    } else {
      setIsPause(false);
    }
  }, [isFocused]);

  const handleVideoError = (error: any) => {
    console.error('Video error:', error);
  };

  const handlePause = useCallback(
    (index: number) => {
      setPaused(prev => {
        const newPaused = [...prev];
        newPaused[index] = !newPaused[index];
        return newPaused;
      });
    },
    [setPaused],
  );

  const handleViewableItemsChanged = useCallback(
    ({viewableItems}: any) => {
      setPaused(
        data.map(
          (_, index) =>
            !viewableItems.some((item: any) => item.index === index),
        ),
      );
    },
    [data],
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleScroll = (event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.y /
        event.nativeEvent.layoutMeasurement.height,
    );
    setCurrentIndex(index);
  };

  const renderItem = ({item, index}: any) => (
    <Pressable onPress={() => handlePause(index)} style={styles.container}>
      <Video
        source={item.sourceVideo || icons.short_2}
        onError={handleVideoError}
        style={styles.backgroundVideo}
        repeat
        paused={paused[index] || isPause}
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
          <Text style={[styles.subtitle, styles.username]}>@devwithmee</Text>
          <Pressable style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </Pressable>
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Config 2022 Opening Keynote - Dustin Doan
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

  return (
    <View
      style={{
        backgroundColor: color.dark,
      }}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Short;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.835,
    backgroundColor: color.dark,
  },
  backgroundVideo: {
    width: width,
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
