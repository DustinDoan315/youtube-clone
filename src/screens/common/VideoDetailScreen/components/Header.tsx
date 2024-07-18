import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {icons} from '@assets/index';

interface HeaderProps {
  handleGoHome: () => void;
}

const Header: React.FC<HeaderProps> = memo(({handleGoHome}) => {
  const onPressGoHome = useCallback(() => {
    handleGoHome();
  }, [handleGoHome]);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressGoHome}>
        <Image
          source={icons.down_arrow}
          resizeMode="contain"
          style={styles.downArrow}
        />
      </Pressable>
      <View style={styles.iconContainer}>
        <Pressable>
          <Image
            source={icons.auto_play}
            resizeMode="contain"
            style={[styles.autoPlay, styles.marginRightIcon]}
          />
        </Pressable>
        <Pressable>
          <Image
            source={icons.connect_tv}
            resizeMode="contain"
            style={[styles.icon, styles.marginRightIcon]}
          />
        </Pressable>
        <Pressable>
          <Image
            source={icons.subtitle}
            resizeMode="contain"
            style={styles.icon}
          />
        </Pressable>
        <Pressable>
          <Image
            source={icons.settings}
            resizeMode="contain"
            style={[styles.icon, styles.settings]}
          />
        </Pressable>
      </View>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downArrow: {
    width: 20,
    height: 20,
  },
  autoPlay: {
    width: 34,
    height: 24,
  },
  icon: {
    width: 24,
    height: 24,
  },
  marginRightIcon: {
    marginRight: 18,
  },
  settings: {
    marginLeft: 18,
  },
});
