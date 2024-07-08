import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, PanResponder, Animated} from 'react-native';

interface ProgressBarProps {
  fullTime: number;
  currentTime: number;
  setIsPlay: any;
  onTimeUpdate: (newTime: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  fullTime,
  currentTime,
  onTimeUpdate,
  setIsPlay,
}) => {
  const progressBarWidth = 300;
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

  // PanResponder for handling gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        pan.setOffset(progressValue.current);
        pan.setValue(0);
        setIsPlay(false);
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

  // Styles for the handle
  const handleSize = 20;
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

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    height: 50,
    backgroundColor: 'white',
  },
  progressContainer: {
    width: 300,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: 10,
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  handle: {
    position: 'absolute',
    backgroundColor: 'green',
    top: 15,
    left: 50,
  },
});

export default ProgressBar;
