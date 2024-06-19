import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {root} from '@navigation/NavigationRef';

const Header = () => {
  const handleNavigate = () => {
    root.goBack();
  };
  return (
    <Pressable style={styles.btnGoBack} onPress={handleNavigate}>
      <Text style={{color: 'white', fontWeight: '700'}}>Go Back</Text>
    </Pressable>
  );
};

export default Header;

const styles = StyleSheet.create({
  btnGoBack: {
    position: 'absolute',
    top: 100,
    left: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});
