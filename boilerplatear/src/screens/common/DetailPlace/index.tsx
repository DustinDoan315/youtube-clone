import {View, Text, Image} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';
import Header from '@components/Header';

const DetailPlace = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 14,
      }}>
      <Header />
      <View
        style={{
          width: '100%',
          paddingVertical: 14,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F4CDCD',
        }}>
        <Image
          source={icons.food_1}
          resizeMode="contain"
          style={{
            width: 200,
            height: 150,
          }}
        />
      </View>
    </View>
  );
};

export default DetailPlace;
