import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';

import {color} from '@theme/index';
import {icons} from '@assets/index';
import {commonRoot, root} from '@navigation/NavigationRef';
import router from '@navigation/router';

const fakeRecommended = [
  {id: 1, text: 'Dustin'},
  {id: 2, text: 'Dustin Doan'},
  {id: 3, text: 'Dustin Doan V1'},
];

const SearchScreen = () => {
  const [searchText, setSearchText] = useState<string>('');

  const goBack = useCallback(() => {
    root.goBack();
  }, []);

  const handleSetText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const navigateListingVideoScreen = useCallback((item: any) => {
    if (item?.text) {
      commonRoot.navigate(router.LISTING_VIDEO_SCREEN, {
        text: item?.text,
      });
    }
  }, []);

  const _renderItem = useCallback(
    ({item}: any) => (
      <Pressable
        onPress={() => navigateListingVideoScreen(item)}
        style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Image
            source={icons.playBack}
            resizeMode="contain"
            style={styles.itemIcon}
          />
          <Text style={styles.itemText}>{item?.text}</Text>
        </View>
        <Image
          source={icons.arrow_pick}
          resizeMode="contain"
          style={styles.itemIcon}
        />
      </Pressable>
    ),
    [navigateListingVideoScreen],
  );

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <Image
            source={icons.arrow_back}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchText}
            onChangeText={handleSetText}
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
      </View>
      {searchText.length > 2 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={fakeRecommended}
            keyExtractor={item => item?.id.toString()}
            renderItem={_renderItem}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  backIcon: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    width: '75%',
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
  resultsContainer: {
    paddingHorizontal: 12,
  },
  itemContainer: {
    marginBottom: 10,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 24,
    height: 24,
    marginRight: 24,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: color.white,
  },
});

export default SearchScreen;
