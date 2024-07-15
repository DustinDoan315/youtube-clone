import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {ListData} from '@utils/fake';
import VideoBanner from '@components/VideoBanner';
import router from '@navigation/router';
import {commonRoot} from '@navigation/NavigationRef';
import {icons} from '@assets/index';
import {color} from '@theme/index';

const ListVideo = () => {
  const navigateVideoScreen = (index: number) => {
    const screenName = router.VIDEO_DETAIL_SCREEN;
    const sourceVideo = index % 2 === 1 ? icons.video_1 : icons.short_2;
    const initialVideoIndex = index;
    commonRoot.navigate(screenName, {sourceVideo, initialVideoIndex});
  };

  const _renderItem = ({item, index}: any) => {
    return (
      <View style={styles.container}>
        {item.id === 'video' && (
          <VideoBanner
            isFocus={false}
            onPlay={() => {}}
            navigateVideoScreen={() => navigateVideoScreen(index)}
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={ListData}
        renderItem={_renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
  },
});

export default ListVideo;
