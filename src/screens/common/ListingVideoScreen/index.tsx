import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {RootState} from '@redux/store';
import VideoBanner from '@components/VideoBanner';
import {color} from '@theme/index';
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
import HeaderSearch from '@components/HeaderSearch';
import ChannelInfo from '@components/ChannelInfo';

const ListingVideoScreen = ({route}: any) => {
  const textSearch = route.params?.text;
  const dispatch = useAppDispatch();
  const videoStorage = useAppSelector((state: RootState) => state.video);

  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(0);
  const [activeShortIndex, setActiveShortIndex] = useState<number | null>(0);
  const [shortPosition, setShortPosition] = useState<number | null>(0);
  const [isScroll, setIsScroll] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const clearCache = () => {
    handleStoreIndex();
    setIsScroll(false);
    setActiveVideoIndex(null);
    setActiveShortIndex(null);
  };

  const refresh = () => {
    setIsLoading(true);

    const idTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(idTimer);
  };

  const handlePlay = (index: number) => {
    setActiveVideoIndex(index);
  };

  const navigateVideoScreen = (index: number) => {
    clearCache();
    commonRoot.navigate(router.VIDEO_DETAIL_SCREEN, {
      sourceVideo: index % 2 === 1 ? icons.video_1 : icons.video_1,
    });
  };

  const navigateShortScreen = (index: number) => {
    clearCache();
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

  const _renderShortBanner = ({_, index}: any) => {
    return (
      <ShortBanner
        isLoading={isLoading}
        isFocus={index === activeShortIndex}
        paused={shortPosition !== activeVideoIndex}
        index={index}
        navigateShortScreen={navigateShortScreen}
      />
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
              refreshing={isLoading}
              extraData={isLoading}
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
            isLoading={isLoading}
            isFocus={index === activeVideoIndex}
            onPlay={() => handlePlay(index)}
            navigateVideoScreen={navigateVideoScreen}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: color.dark,
      }}>
      <HeaderSearch text={textSearch} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh}>
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={color.bg_subscribe} />
              </View>
            )}
          </RefreshControl>
        }
        showsVerticalScrollIndicator={false}>
        <ChannelInfo />
        <FlatList
          data={ListData}
          scrollEnabled={false}
          renderItem={_renderHomeItem}
          keyExtractor={(_, index) => index.toString()}
          onScroll={isScroll ? handleScrollVideoBanner : () => {}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{height: 200}} />}
        />
      </ScrollView>
    </View>
  );
};

export default ListingVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
  },
  loadingContainer: {
    alignItems: 'center',
  },
});
