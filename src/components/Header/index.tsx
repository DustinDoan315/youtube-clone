import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';
import {bottomRoot, commonRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';

const Header = ({handleGoHome}: any) => {
  const goHome = () => {
    bottomRoot.navigate(router.HOME_SCREEN, {id: '123'});
  };

  const navigateSearchScreen = () => {
    commonRoot.navigate(router.SEARCH_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleGoHome || goHome}>
        <Image
          source={icons.youtube_logo_big}
          resizeMode="contain"
          style={styles.logo}
        />
      </Pressable>
      <View style={styles.iconContainer}>
        <Pressable>
          <Image
            source={icons.connect_tv}
            resizeMode="contain"
            style={styles.icon}
          />
        </Pressable>
        <Pressable>
          <Image
            source={icons.bell}
            resizeMode="contain"
            style={[styles.icon, styles.bellIcon]}
          />
        </Pressable>
        <Pressable onPress={navigateSearchScreen}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.icon}
          />
        </Pressable>
        <Pressable>
          <Image
            source={icons.avatar}
            resizeMode="contain"
            style={[styles.icon, styles.avatarIcon]}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: color.dark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 86,
    height: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  bellIcon: {
    marginHorizontal: 18,
  },
  avatarIcon: {
    marginLeft: 18,
  },
});
