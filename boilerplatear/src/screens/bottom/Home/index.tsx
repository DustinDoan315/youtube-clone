import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, View, Dimensions} from 'react-native';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import SearchBar from '@components/SearchBar';
import {RootState} from '@redux/store';
import VideoBanner from '@components/VideoBanner';

const HomeView = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const videoRefs = useRef<{[key: string]: any}>({});
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const _renderItem = ({item, index}: any) => {
    return (
      <View style={{marginBottom: 14}}>
        <VideoBanner
          ref={(ref: any) => (videoRefs.current[index] = ref)}
          isFocus={index === activeVideoIndex}
        />
      </View>
    );
  };

  const handleScroll = (event: any) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const visibleIndex = Math.floor(contentOffset.y / 250);
    // console.log(contentOffset.y, layoutMeasurement.height);

    setActiveVideoIndex(visibleIndex);
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
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
    backgroundColor: 'white',
    paddingHorizontal: 14,
  },
});
