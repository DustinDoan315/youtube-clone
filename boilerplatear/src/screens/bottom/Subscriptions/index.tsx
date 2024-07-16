import {ScrollView, View} from 'react-native';
import React from 'react';
import Header from '@components/Header';
import Explore from '@components/Explore';
import {color} from '@theme/index';
import ListChannelAvatar from '@components/ListChannelAvatar';
import {icons} from '@assets/index';
import ListVideo from '@components/ListVideo';

const Subscriptions = () => {
  const fakeDataExplore = ['All', 'Today', 'Continue watching', 'Unwatched'];
  const fakeDataListChannelAvatar = [
    {
      id: 1,
      name: 'Kola Bear',
      icon: icons.avatar,
    },
    {
      id: 2,
      name: 'Kola Bear',
      icon: icons.soundImage,
    },
    {
      id: 3,
      name: 'Kola Bear',
      icon: icons.avatar,
    },
    {
      id: 4,
      name: 'Kola Bear',
      icon: icons.soundImage,
    },
    {
      id: 5,
      name: 'Kola Bear',
      icon: icons.avatar,
    },
    {
      id: 6,
      name: 'Kola Bear',
      icon: icons.soundImage,
    },
    {
      id: 7,
      name: 'Kola Bear',
      icon: icons.avatar,
    },
  ];
  return (
    <View
      style={{
        backgroundColor: color.dark,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <ListChannelAvatar listData={fakeDataListChannelAvatar} />
        <Explore listData={fakeDataExplore} />

        <ListVideo />
      </ScrollView>
    </View>
  );
};

export default Subscriptions;
