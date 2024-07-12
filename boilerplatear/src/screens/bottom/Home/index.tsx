import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View, Image, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {RootState} from '@redux/store';
import VideoBanner from '@components/VideoBanner';
import Header from '@components/Header';
import {color} from '@theme/index';
import Explore from '@components/Explore';
import {
  ShortVideoPaddingHorizontal,
  ShortVideoWidth,
  VideoHeight,
} from '@utils/response';
import ShortBanner from '@components/ShortBanner';
import {icons} from '@assets/index';
import {ListData} from '@utils/fake';
import {bottomRoot, commonRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';
import {useIsFocused} from '@react-navigation/native';
import {setVideoIndex} from '@redux/video/videoSlice';

const HomeView = () => {
  const dispatch = useAppDispatch();
  const videoStorage = useAppSelector((state: RootState) => state.video);

  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(0);
  const [activeShortIndex, setActiveShortIndex] = useState<number | null>(0);
  const [shortPosition, setShortPosition] = useState<number | null>(0);
  const [isScroll, setIsScroll] = useState<boolean>(true);

  const isFocused = useIsFocused();

  const handleStoreIndex = useCallback(() => {
    dispatch(
      setVideoIndex({
        video: activeVideoIndex,
        short: activeShortIndex,
      }),
    );
  }, [activeVideoIndex, activeShortIndex, dispatch]);

  useEffect(() => {
    if (!isFocused) {
      handleStoreIndex();
      setIsScroll(false);
      setActiveVideoIndex(null);
      setActiveShortIndex(null);
    } else {
      setIsScroll(true);
      setActiveVideoIndex(videoStorage.videoIndex);
      setActiveShortIndex(videoStorage.shortIndex);
    }
  }, [isFocused]);

  useEffect(() => {
    const position = ListData.findIndex((item: any) => item.id === 'short');
    setShortPosition(position);
  }, []);

  const handlePlay = (index: number) => {
    setActiveVideoIndex(index);
  };

  const navigateVideoScreen = (index: number) => {
    commonRoot.navigate(router.VIDEO_DETAIL_SCREEN, {
      sourceVideo: index % 2 === 1 ? icons.video_1 : icons.video_1,
    });
  };

  const navigateShortScreen = (index: number) => {
    bottomRoot.navigate(router.SHORT_SCREEN, {
      sourceVideo: index % 2 === 1 ? icons.short_1 : icons.short_2,
    });
  };

  const handleScrollVideoBanner = (event: any) => {
    const {contentOffset} = event.nativeEvent;
    const visibleIndex = Math.floor(contentOffset.y / VideoHeight);
    setActiveVideoIndex(visibleIndex);
  };

  const handleScrollShortBanner = (event: any) => {
    const {contentOffset} = event.nativeEvent;
    const visibleIndex = Math.floor(
      contentOffset.x / (ShortVideoWidth - ShortVideoPaddingHorizontal),
    );
    setActiveShortIndex(visibleIndex);
  };

  const _renderShortBanner = ({item, index}: any) => {
    return (
      <View>
        <ShortBanner
          isFocus={index === activeShortIndex}
          paused={shortPosition !== activeVideoIndex}
          index={index}
          navigateShortScreen={navigateShortScreen}
        />
      </View>
    );
  };

  const _renderHomeItem = ({item, index}: any) => {
    return (
      <View style={styles.container}>
        {item.id === 'short' ? (
          <View style={{marginVertical: 12}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                source={icons.short_red}
                style={{width: 24, height: 24, marginRight: 8}}
                resizeMode="contain"
              />
              <Text
                style={{fontSize: 16, fontWeight: '600', color: color.white}}>
                Shorts
              </Text>
            </View>
            <FlatList
              horizontal
              data={[1, 2, 3, 4, 5]}
              scrollEnabled={isScroll}
              onScroll={handleScrollShortBanner}
              renderItem={_renderShortBanner}
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={() => <View style={{height: 200}} />}
            />
          </View>
        ) : (
          <VideoBanner
            isFocus={index === activeVideoIndex}
            onPlay={() => handlePlay(index)}
            navigateVideoScreen={navigateVideoScreen}
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <Header />
      <Explore />
      <FlatList
        data={ListData}
        scrollEnabled={isScroll}
        renderItem={_renderHomeItem}
        keyExtractor={(_, index) => index.toString()}
        onScroll={isScroll ? handleScrollVideoBanner : () => {}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{height: 200}} />}
      />
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
  },
});
