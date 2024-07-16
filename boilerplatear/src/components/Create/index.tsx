import React from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import {color} from '@theme/index';
import {icons} from '@assets/index';

const Create = ({setShowBottomSheet}: any) => {
  const activityItems = [
    {
      id: 1,
      icon: icons.short,
      title: 'Create a Short',
    },
    {
      id: 2,
      icon: icons.upload,
      title: 'Upload a video',
    },
    {
      id: 3,
      icon: icons.goLive,
      title: 'Go live',
    },
    {
      id: 4,
      icon: icons.edit,
      title: 'Create a post',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create</Text>
        <Pressable onPress={() => setShowBottomSheet(false)}>
          <Image
            resizeMode="contain"
            source={icons.close}
            style={styles.closeIcon}
          />
        </Pressable>
      </View>

      {activityItems.map(item => (
        <Pressable key={item.id.toString()} style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Image
              resizeMode="contain"
              source={item.icon}
              style={styles.itemIcon}
            />
          </View>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.white,
  },
  closeIcon: {
    width: 18,
    height: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: color.dark_light_2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  itemTitle: {
    fontSize: 16,
    color: color.white,
    marginLeft: 10,
  },
});

export default Create;
