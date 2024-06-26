import {View, Text, Image} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';

const Header = () => {
  return (
    <View
      style={{
        paddingHorizontal: 14,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={icons.location}
          style={{
            width: 17.5,
            height: 24,
            marginRight: 8,
          }}
          resizeMode="cover"
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 20,
              marginRight: 3,
            }}>
            AP Block
          </Text>
          <Image
            source={icons.down_arrow}
            style={{
              width: 13,
              height: 8,
            }}
          />
        </View>
      </View>

      <View>
        <Image
          source={icons.avatar}
          style={{
            width: 30,
            height: 30,
          }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Header;
