import React, {useMemo} from 'react';
import {View, Text, Image, Pressable, FlatList, StyleSheet} from 'react-native';
import {icons} from '@assets/index';
import {Categories} from '@utils/fake';

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
    height: 312,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'green',
  },
  listItemImageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    width: '100%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  listItemImage: {
    width: 280,
    height: 130,
  },
  listItemDescription: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  listItemText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  listItemDisPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  listItemPrice: {
    fontSize: 12,
    marginLeft: 5,
    color: 'gray',
    textDecorationLine: 'line-through',
  },
});

const TodaySpecial = () => {
  const data = Categories;

  const renderItem = ({item, index}: any) => (
    <View
      key={item?.id}
      style={[styles.listItem, {marginLeft: index === 0 ? 14 : 0}]}>
      <View style={styles.listItemImageContainer}>
        <Pressable
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            borderRadius: 32,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Image
            source={icons.heart}
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
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.listItemDisPrice}>{item?.disPrice}</Text>
          <Text style={styles.listItemPrice}>{`$${item?.price}`}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <View style={[styles.container, styles.header]}>
        <View style={styles.headerLeft}>
          <Image source={icons.highlight} style={styles.headerImage} />
          <Text style={styles.headerText}>Today Special</Text>
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

export default TodaySpecial;
