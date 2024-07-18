import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '@theme/index';

type Item = {
  id: number | string;
  name: string;
  icon: any;
};

interface ListChannelAvatarType {
  listData: Item[];
}

const ListChannelAvatar = ({listData}: ListChannelAvatarType) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.childContainer}>
        {listData?.slice(0, 6).map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Pressable
              key={item?.id.toString()}
              onPress={() => setActiveIndex(index)}
              style={[styles.iconContainer]}>
              <Image
                source={item?.icon}
                resizeMode="contain"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 56,
                }}
              />

              <Text style={[styles.text, {color: color.white, marginTop: 5}]}>
                {item?.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable
        style={{
          zIndex: 9,
          width: 50,
          height: 104,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.dark,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: color.blue_1,
          }}>
          {'All'}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default ListChannelAvatar;

const styles = StyleSheet.create({
  container: {
    height: 104,
    width: '100%',
    backgroundColor: color.dark,
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
});
