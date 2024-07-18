import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';
import {commonRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={[styles.icon, styles.searchIcon]}
          />
        </Pressable>
        <Pressable>
          <Image
            source={icons.camera}
            resizeMode="contain"
            style={styles.icon}
          />
        </Pressable>
        <Pressable>
          <Image
            source={icons.more}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  searchIcon: {
    marginHorizontal: 18,
  },
  avatarIcon: {
    marginLeft: 18,
  },
});
