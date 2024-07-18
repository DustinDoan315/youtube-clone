import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';

const Title = ({title, icon}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
            marginRight: 12,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            color: color.white,
          }}>
          {title}
        </Text>
      </Pressable>

      <Pressable>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: color.blue_1,
          }}>
          {'View all'}
        </Text>
      </Pressable>
    </View>
  );
};

export default Title;
