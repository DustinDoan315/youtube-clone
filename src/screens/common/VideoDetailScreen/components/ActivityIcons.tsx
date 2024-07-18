import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';

interface IconButtonProps {
  icon: any;
  size: number;
  isPlay?: boolean;
  setIsPlay?: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  isPlay,
  setIsPlay,
}) => (
  <Pressable
    onPress={() => {
      setIsPlay && setIsPlay(!isPlay);
    }}
    style={[
      styles.button,
      {width: size, height: size, borderRadius: size / 2},
    ]}>
    <View
      style={[
        styles.overlay,
        {width: size, height: size, borderRadius: size / 2},
      ]}
    />
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        styles.icon,
        {width: size / 2, height: size / 2, position: 'absolute'},
      ]}
    />
  </Pressable>
);

const ActivityIcons = memo(({isPlay, setIsPlay}: any) => (
  <View style={styles.container}>
    <IconButton icon={icons.previous} size={38} />
    <IconButton
      setIsPlay={setIsPlay}
      isPlay={isPlay}
      icon={isPlay ? icons.continues : icons.pause}
      size={54}
    />
    <IconButton icon={icons.next} size={38} />
  </View>
));

export default ActivityIcons;

const styles = StyleSheet.create({
  container: {
    width: 210,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  icon: {
    position: 'absolute',
  },
});
