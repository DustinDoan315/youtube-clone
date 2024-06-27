import React, {memo, useMemo} from 'react';
import {View, Text, Image, Pressable, FlatList, StyleSheet} from 'react-native';
import {icons} from '@assets/index';
import {Categories} from '@utils/fake';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'gray',
  },
  listContainer: {
    paddingVertical: 14,
  },
  listItem: {
    width: 88,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemImageContainer: {
    width: 88,
    height: 88,
    borderRadius: 88,
  },
  listItemImage: {
    width: 88,
    height: 88,
  },
  listItemText: {
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
  },
});

const PopularCategories = () => {
  const data = Categories;

  const renderItem = ({item, index}: any) => (
    <View
      key={index.toString()}
      style={[styles.listItem, {marginLeft: index === 0 ? 14 : 0}]}>
      <View style={styles.listItemImageContainer}>
        <Image source={item?.icon} style={styles.listItemImage} />
      </View>
      <Text style={styles.listItemText}>{item?.name}</Text>
    </View>
  );

  return (
    <View>
      <View style={[styles.container, styles.header]}>
        <View style={styles.headerLeft}>
          <Image source={icons.highlight} style={styles.headerImage} />
          <Text style={styles.headerText}>Popular Categories</Text>
        </View>
        <Pressable>
          <Text style={styles.seeAllText}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default memo(PopularCategories);
