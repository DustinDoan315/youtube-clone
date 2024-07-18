import {color} from '@theme/index';
import React, {ReactNode, useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_HEIGHT = SCREEN_HEIGHT * 0.55;

interface BottomSheetProps {
  setShowBottomSheet: (isVisible: boolean) => void;
  children?: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  setShowBottomSheet,
  children,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.spring(translateY, {
            toValue: SCREEN_HEIGHT,
            useNativeDriver: true,
          }).start(() => setShowBottomSheet(false));
        }
      },
    }),
  ).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: SCREEN_HEIGHT - MAX_HEIGHT,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.container, {transform: [{translateY}]}]}>
      <View style={styles.line} />
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: MAX_HEIGHT,
    backgroundColor: color.dark_light_1,
    position: 'absolute',
    top: 0,
    borderRadius: 25,
    paddingHorizontal: 10,
    zIndex: 1200,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 14,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BottomSheet;
