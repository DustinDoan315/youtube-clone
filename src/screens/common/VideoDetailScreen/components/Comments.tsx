import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {memo, useState} from 'react';
import {color} from '@theme/index';
import {icons} from '@assets/index';
import {tapHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler';

const Comments = memo(() => {
  const [isShowFullComments, setIsShowFullComments] = useState<boolean>(false);

  const handleExpandComment = () => {
    setIsShowFullComments(!isShowFullComments);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.commentContainer}>
        <Text style={styles.commentText}>Comments</Text>
        <Text style={styles.commentNums}>18</Text>
      </Pressable>
      <View style={styles.infoContainer}>
        <Pressable style={styles.userInfoContainer}>
          <Image
            style={styles.avatar}
            resizeMode="contain"
            source={icons.avatar}
          />
          <Text
            numberOfLines={isShowFullComments ? 9 : 2}
            style={styles.subtitle}>
            Will AI Replace this UI/UX Designers Skills and Jobs if they take
            What The Purpose of Learning New Skills
          </Text>
        </Pressable>
        <Pressable onPress={handleExpandComment} style={styles.bell}>
          <Image
            style={[styles.downArrow]}
            resizeMode="contain"
            source={icons.down_arrow}
          />
        </Pressable>
      </View>
    </View>
  );
});

export default Comments;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: color.dark_light_1,
  },
  commentContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    fontSize: 14,
    color: color.white,
    marginRight: 8,
  },
  commentNums: {
    fontSize: 12,
    color: color.secondText,
  },
  infoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bell: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
  },
  downArrow: {
    width: 12,
    height: 12,
  },
  subtitle: {
    fontSize: 12,
    color: color.white,
    marginLeft: 8,
    maxWidth: '80%',
  },
});
