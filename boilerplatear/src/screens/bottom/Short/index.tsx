import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';
import {height, width} from '@utils/response';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {RootState} from '@redux/store';
import {authRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';
import {logout} from '@redux/user/userSlice';
import Video from 'react-native-video';
import Header from './components/Header';
import ActivityIcons from './components/ActivityIcons';

const Short = ({route}: any) => {
  const data = route.params;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  const handleVideoError = (error: any) => {
    console.error('Video error:', error);
  };

  return (
    <View style={styles.container}>
      <Video
        source={data.sourceVideo}
        onError={handleVideoError}
        style={styles.backgroundVideo}
        repeat
        resizeMode="stretch"
      />

      <View
        style={{
          position: 'absolute',
          right: 4,
          top: 8,
        }}>
        <Header />
      </View>

      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: 3,
        }}>
        <ActivityIcons />
      </View>

      <View style={styles.infoContainer}>
        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              width: 32,
              height: 32,
            }}
            resizeMode="contain"
            source={icons.avatar}
          />
          <Text
            style={[
              styles.subtitle,
              {marginHorizontal: 10, color: color.white},
            ]}>
            @stevenhechinese
          </Text>

          <Pressable
            style={{
              width: 78,
              height: 26,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              backgroundColor: color.bg_subscribe,
            }}>
            <Text
              style={[styles.subtitle, , {fontSize: 14, color: color.white}]}>
              Subscribe
            </Text>
          </Pressable>
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Config 2022 Opening Keynote - Dylan Field
          </Text>
        </View>

        <View style={styles.textSoundContainer}>
          <Image
            style={{
              width: 16,
              height: 16,
              marginRight: 5,
            }}
            resizeMode="contain"
            source={icons.music}
          />
          <Text style={[styles.subtitle, {color: color.white}]}>
            Original Sound
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Short;

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: color.dark,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    maxHeight: 108,
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  textContainer: {
    maxWidth: '100%',
    marginVertical: 10,
  },
  textSoundContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: color.white,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
    color: color.secondText,
  },
});
