import {icons} from '@assets/index';
import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

const VideoBanner = ({isFocus}: any) => {
  const videoRef = useRef<VideoRef>(null);

  const handleVideoError = (error: any) => {
    console.error('Video error:', error);
    // Handle error gracefully, e.g., show an error message to the user
  };

  return (
    <View style={styles.container}>
      <Video
        source={icons.video_1}
        ref={videoRef}
        onError={handleVideoError}
        style={styles.backgroundVideo}
        paused={!isFocus}
        controls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
  },
  backgroundVideo: {
    flex: 1,
  },
});

export default VideoBanner;
