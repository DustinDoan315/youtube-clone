import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {root} from '@navigation/NavigationRef';
import {icons} from '@assets/index';

const Header = () => {
  const handleNavigate = () => {
    root.goBack();
  };
  return (
    <Pressable style={styles.btnGoBack} onPress={handleNavigate}>
      <Image
        source={icons.down_arrow}
        resizeMode="contain"
        style={{
          width: 18,
          height: 18,
          transform: [{rotate: '90deg'}],
        }}
      />
    </Pressable>
  );
};

export default Header;

const styles = StyleSheet.create({
  btnGoBack: {
    paddingBottom: 14,
    justifyContent: 'center',
    width: 50,
  },
});
