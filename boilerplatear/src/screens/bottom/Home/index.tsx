import React, {useEffect, useRef, useState} from 'react';
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
import {bottomRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';
import {useIsFocused} from '@react-navigation/native';

const HomeView = () => {
  const videoRefs = useRef<{[key: string]: any}>({});
  const shortRefs = useRef<{[key: string]: any}>({});
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(0);
  const [activeShortIndex, setActiveShortIndex] = useState<number | null>(0);
  const [shortPosition, setShortPosition] = useState<number | null>(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setActiveVideoIndex(9999);
      setActiveShortIndex(9999);
      // Pause all video and short refs when the screen is not focused
      Object.values(videoRefs.current).forEach(ref => ref?.pause());
      Object.values(shortRefs.current).forEach(ref => ref?.pause());
    }
  }, [isFocused]);

  useEffect(() => {
    const position = ListData.findIndex((item: any) => item.id === 'short');
    setShortPosition(position);
  }, []);

  const handlePlay = (index: number) => {
    setActiveVideoIndex(index);
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
          ref={(ref: any) => (shortRefs.current[index] = ref)}
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
              onScroll={handleScrollShortBanner}
              renderItem={_renderShortBanner}
              keyExtractor={(_, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={() => <View style={{height: 200}} />}
            />
          </View>
        ) : (
          <VideoBanner
            ref={(ref: any) => (videoRefs.current[index] = ref)}
            isFocus={index === activeVideoIndex}
            onPlay={() => handlePlay(index)}
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
        renderItem={_renderHomeItem}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScrollVideoBanner}
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
