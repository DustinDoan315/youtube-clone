import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';
import VideoBanner from '@components/VideoBanner';
import Title from './Title';

const PlayList = () => {
  const fakeDataHistory = [
    {
      sourceVideo: icons.short_2,
      title: 'Liked videos',
      quality: '12',
      numLike: '268',
      numPlayList: 0,
      isLike: true,
      isPlayList: false,
      isPrivate: false,
    },
    {
      sourceVideo: icons.video_1,
      title: 'Intro of my Channel',
      quality: '18',
      numLike: 0,
      numPlayList: '2',
      isLike: false,
      isPlayList: true,
      isPrivate: false,
    },
    {
      sourceVideo: icons.video_1,
      title: 'Watch Late',
      quality: 0,
      numLike: 0,
      numPlayList: 0,
      isLike: false,
      isPlayList: false,
      isPrivate: true,
    },
  ];

  const _renderItem = ({item}: any) => {
    return (
      <View
        style={{
          width: 138,
          height: 154,
          marginRight: 16,
        }}>
        <View
          style={{
            width: '100%',
            height: 78,
            backgroundColor: color.dark_light_2,
            borderRadius: 8,
          }}>
          <VideoBanner
            notShowTimeLine
            justRenderVideo
            videoStyle={{
              width: 138,
              height: 78,
              overflow: 'hidden',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: color.primaryText,
              marginTop: -12,
            }}
            sourceVideo={item?.sourceVideo}
          />
          {(item?.isLike || item?.isPlayList) && (
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                flexDirection: item?.isPlayList && 'row',
                bottom: item?.isLike ? 17 : 6,
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={item?.isPlayList ? icons.playList : icons.like}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: item?.isPlayList && 5,
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: color.white,
                }}>
                {item?.isPlayList ? item?.numPlayList : item?.numLike}
              </Text>
            </View>
          )}
        </View>

        <View>
          <View
            style={{
              marginTop: 6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: color.white,
              }}>
              {item?.title}
            </Text>

            <Image
              resizeMode="contain"
              source={icons.more}
              style={{
                width: 16,
                height: 16,
                marginRight: -6,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 12,
              marginTop: 1,
              color: color.secondText,
            }}>
            {item?.isPrivate ? 'Private' : `${item?.quality} watched`}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: color.primaryText,
      }}>
      <Title icon={icons.playList} title={'Play Lists'} />
      <FlatList
        horizontal
        data={fakeDataHistory}
        keyExtractor={(_, index: number) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default PlayList;
