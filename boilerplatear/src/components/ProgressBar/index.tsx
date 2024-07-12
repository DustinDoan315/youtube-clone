import {color} from '@theme/index';
import {height, width} from '@utils/response';
import React, {useRef, useEffect, memo} from 'react';
import {View, StyleSheet, PanResponder, Animated} from 'react-native';

interface ProgressBarProps {
  fullTime: number;
  currentTime: number;
  setIsPlay: any;
  isFullScreen: boolean;
  onTimeUpdate: (newTime: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  fullTime,
  currentTime,
  onTimeUpdate,
  setIsPlay,
  isFullScreen,
}) => {
  const progressBarWidth = width;
  const pan = useRef(new Animated.Value(0)).current;

  const progressValue = useRef(0);

  useEffect(() => {
    const id = pan.addListener(({value}) => {
      progressValue.current = value;
    });

    return () => {
      pan.removeListener(id);
    };
  }, [pan]);

  useEffect(() => {
    const newProgress = (currentTime / fullTime) * progressBarWidth;
    if (!isNaN(newProgress)) {
      pan.setValue(newProgress);
    }
  }, [currentTime, fullTime, progressBarWidth, pan]);

  const handleUpdatePosition = (newProgress: number) => {
    return (newProgress / progressBarWidth) * fullTime;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        pan.setOffset(progressValue.current);
        pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, {dx: pan}], {
        useNativeDriver: false,
        listener: () => {
          setIsPlay(false);
        },
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        const newProgress = Math.min(
          Math.max(progressValue.current, 0),
          progressBarWidth,
        );
        const newTime = handleUpdatePosition(newProgress);
        if (!isNaN(newTime)) {
          onTimeUpdate(newTime);
        }
      },
    }),
  ).current;

  const handleSize = 12;
  const handleStyle = {
    transform: [
      {
        translateX: pan.interpolate({
          inputRange: [0, progressBarWidth],
          outputRange: [0, progressBarWidth - handleSize],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
      height: 10,
      width: isFullScreen ? height : width,
      backgroundColor: 'transparent',
      position: 'absolute',
      top: isFullScreen ? null : 205,
      bottom: isFullScreen ? 5 : null,
    },
    progressContainer: {
      width: '100%',
      height: 2,
      backgroundColor: false ? color.bg_red : '#8C8C8C',
      borderRadius: 10,
      overflow: 'hidden',
    },
    progress: {
      height: 10,
      backgroundColor: color.bg_red,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    handle: {
      position: 'absolute',
      backgroundColor: color.bg_red,
      top: -1,
      left: 0,
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progress,
            {width: `${(currentTime / fullTime) * 100}%`},
          ]}
        />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.handle,
          handleStyle,
          {
            width: handleSize,
            height: handleSize,
            borderRadius: handleSize / 2,
          },
        ]}
      />
    </View>
  );
};

export default memo(ProgressBar);
