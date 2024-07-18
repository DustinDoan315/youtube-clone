import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Keyboard,
  TextInput,
} from 'react-native';

import {color} from '@theme/index';
import {icons} from '@assets/index';
import {root} from '@navigation/NavigationRef';

const HeaderSearch = ({text = ''}: any) => {
  const [searchText, _] = useState<string>(text);

  const goBack = useCallback(() => {
    root.goBack();
  }, []);

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <Image
            source={icons.arrow_back}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>

        <View style={styles.searchContainer}>
          <TextInput
            value={searchText}
            editable={false}
            placeholder="Search on Youtube"
            placeholderTextColor={color.secondText}
            style={styles.searchInput}
          />
          <Pressable style={styles.closeButton} onPress={goBack}>
            <Image
              source={icons.close}
              style={styles.closeIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <Pressable style={styles.recordButton}>
          <Image
            source={icons.record}
            style={styles.recordIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable style={styles.recordButton}>
          <Image
            source={icons.connect_tv}
            style={styles.recordIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable style={styles.recordButton}>
          <Image
            source={icons.more}
            style={styles.recordIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.dark,
  },
  header: {
    width: '100%',
    height: 44,
    marginVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    width: '50%',
    backgroundColor: color.dark_light_2,
    height: 32,
    borderRadius: 40,
    position: 'relative',
  },
  searchInput: {
    paddingHorizontal: 12,
    backgroundColor: color.dark_light_2,
    width: '92.5%',
    height: 32,
    borderRadius: 40,
    color: color.white,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 9,
  },
  closeIcon: {
    width: 12,
    height: 12,
  },
  recordButton: {
    width: 32,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.dark_light_1,
  },
  recordIcon: {
    width: 20,
    height: 20,
  },
});

export default HeaderSearch;
