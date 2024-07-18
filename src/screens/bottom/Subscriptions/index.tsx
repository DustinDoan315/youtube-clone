import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
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

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const id = setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    return () => clearTimeout(id);
  }, []);
  return (
    <View
      style={{
        backgroundColor: color.dark,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.bg_red]}
            tintColor={color.bg_red}
          />
        }
        showsVerticalScrollIndicator={false}>
        <Header />
        <ListChannelAvatar listData={fakeDataListChannelAvatar} />
        <Explore listData={fakeDataExplore} />

        <ListVideo isLoading={refreshing} />
      </ScrollView>
    </View>
  );
};

export default Subscriptions;
