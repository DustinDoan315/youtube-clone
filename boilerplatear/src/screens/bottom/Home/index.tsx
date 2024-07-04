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

const HomeView = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const videoRefs = useRef<{[key: string]: any}>({});
  const ShortRefs = useRef<{[key: string]: any}>({});
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(0);
  const [activeShortIndex, setActiveShortIndex] = useState<number | null>(0);
  const [shortPosition, setShortPosition] = useState<number | null>(0);

  useEffect(() => {
    const position = ListData.findIndex((item: any) => item.id === 'short');
    setShortPosition(position);
  }, [ListData]);

  const handlePlay = (index: number) => {
    setActiveVideoIndex(index);
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
          ref={(ref: any) => (ShortRefs.current[index] = ref)}
          isFocus={index === activeShortIndex}
          paused={shortPosition !== activeVideoIndex}
        />
      </View>
    );
  };

  const _renderHomeItem = ({item, index}: any) => {
    return (
      <View style={styles.container}>
        {item.id === 'short' ? (
          <View
            style={{
              marginVertical: 12,
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={icons.short_red}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: color.white,
                }}>
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
