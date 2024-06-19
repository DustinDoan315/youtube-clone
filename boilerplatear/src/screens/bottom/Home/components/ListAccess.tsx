/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {width} from '@utils/response';
import {FakeListAssets} from '@utils/fake';
import AccessItem from './AccessItem';

const ListAccess = () => {
  const _renderItem = ({item}: any) => {
    return <AccessItem item={item} />;
  };

  return (
    <View style={styles.listAssetContainer}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 7,
          color: 'black',
        }}>
        {'Assets'}
      </Text>
      <FlatList
        scrollEnabled={false}
        data={FakeListAssets}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default ListAccess;

export const styles = StyleSheet.create({
  listAssetContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  assetItem: {
    width: width,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginVertical: 5,
  },
  assetItemImage: {
    width: 48,
    height: '100%',
    marginTop: 7,
  },
  tokenName: {
    marginHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
  },
  tokenPrice: {
    position: 'absolute',
    right: 32,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
