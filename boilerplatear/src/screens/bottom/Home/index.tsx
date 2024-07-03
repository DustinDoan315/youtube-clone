import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, View, Dimensions} from 'react-native';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import SearchBar from '@components/SearchBar';
import {RootState} from '@redux/store';
import VideoBanner from '@components/VideoBanner';
import Header from '@components/Header';
import {color} from '@theme/index';
import Explore from '@components/Explore';
import {VideoHeight} from '@utils/response';

const HomeView = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const videoRefs = useRef<{[key: string]: any}>({});
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(0);

  const _renderItem = ({item, index}: any) => {
    return (
      <View>
        <VideoBanner
          ref={(ref: any) => (videoRefs.current[index] = ref)}
          isFocus={index === activeVideoIndex}
        />
      </View>
    );
  };

  const _renderHome = () => {
    return (
      <View style={styles.container}>
        <Header />
        <Explore />
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={_renderItem}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{height: 200}} />}
        />
      </View>
    );
  };

  const handleScroll = (event: any) => {
    const {contentOffset} = event.nativeEvent;
    const visibleIndex = Math.floor(contentOffset.y / VideoHeight);

    setActiveVideoIndex(visibleIndex);
  };

  return (
    <FlatList
      data={[1]}
      renderItem={_renderHome}
      keyExtractor={(item, index) => index.toString()}
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
  },
});
