import {View, Text, TextInput, Image, Pressable} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';

const SearchBar = () => {
  return (
    <View style={{paddingVertical: 14}}>
      <Pressable
        style={{
          position: 'absolute',
          top: 27,
          left: 24,
        }}>
        <Image
          source={icons.search}
          style={{
            width: 17,
            height: 17,
          }}
        />
      </Pressable>
      <TextInput
        value=""
        onChangeText={() => {}}
        placeholder="Type a dish or cuisine"
        style={{
          borderWidth: 1,
          borderColor: color.primaryBorder,
          paddingHorizontal: 12,
          paddingLeft: 36,
          borderRadius: 6,
          height: 40,
        }}
      />
    </View>
  );
};

export default SearchBar;
