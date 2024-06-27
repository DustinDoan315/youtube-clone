import React, {memo, useCallback, useMemo, useState} from 'react';
import {View, Text, Image, Pressable, FlatList, StyleSheet} from 'react-native';
import {icons} from '@assets/index';
import {Categories, Special} from '@utils/fake';
import {color} from '@theme/index';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    marginTop: 15,
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
    width: 284,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: color.primary,
  },
  listItemImageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    width: '100%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
  listItemImage: {
    width: 280,
    height: 130,
  },
  listItemDescription: {
    width: '100%',
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  listItemText: {
    fontSize: 20,
    fontWeight: '500',
    color: color.primaryText,
  },
  listItemDesc: {
    fontSize: 12,
    color: color.secondText,
    marginBottom: 5,
  },
  listItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.primaryText,
  },
  listItemStar: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 3,
    color: color.primaryText,
  },
  listItemComment: {
    fontSize: 16,
    color: color.primaryText,
  },
});

const TodaySpecial = () => {
  const data = Special;
  const [favorites, setFavorites] = useState<String[]>([]);

  const toggleFavorite = useCallback(
    (id: String) => {
      setFavorites(prevFavorites =>
        prevFavorites.includes(id)
          ? prevFavorites.filter(favId => favId !== id)
          : [...prevFavorites, id],
      );
    },
    [favorites],
  );

  console.log('favorites', favorites);

  const renderItem = ({item, index}: any) => (
    <View
      key={item?.id}
      style={[styles.listItem, {marginLeft: index === 0 ? 14 : 0}]}>
      <View style={styles.listItemImageContainer}>
        <Pressable
          onPress={() => toggleFavorite(item.id)}
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            borderRadius: 32,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: favorites.includes(item?.id)
              ? color.crimson
              : 'white',
          }}>
          <Image
            source={
              favorites.includes(item?.id) ? icons.white_heart : icons.heart
            }
            style={{
              width: 16,
              height: 16,
            }}
          />
        </Pressable>
        <Image
          source={item?.icon}
          style={styles.listItemImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.listItemDescription}>
        <Text style={styles.listItemText}>{item?.name}</Text>
        <View
          style={{
            justifyContent: 'center',
            paddingVertical: 5,
          }}>
          <Text
            numberOfLines={2}
            style={styles.listItemDesc}>{`${item?.desc}`}</Text>
          <Text style={styles.listItemPrice}>{`${item?.price}`}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            paddingVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={icons.star}
              style={{
                width: 14,
                height: 14,
                marginRight: 4,
              }}
              resizeMode="contain"
            />
            <Text style={styles.listItemStar}>{`${item?.rating}`}</Text>
            <Text
              style={
                styles.listItemComment
              }>{`(${item?.numberOfComments})`}</Text>
          </View>

          <Pressable>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: color.primaryText,
              }}>
              {'View more'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <View style={[styles.container, styles.header]}>
        <View style={styles.headerLeft}>
          <Image source={icons.highlight} style={styles.headerImage} />
          <Text style={styles.headerText}>Today's Special</Text>
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

export default memo(TodaySpecial);
