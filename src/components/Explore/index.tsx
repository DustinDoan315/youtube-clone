import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';

interface ExploreType {
  isShowExplore?: boolean;
  listData: string[];
  setIsLoading?: any;
}

const Explore = ({isShowExplore, listData, setIsLoading}: ExploreType) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const chooseItem = (index: number) => {
    setActiveIndex(index);
    if (setIsLoading) {
      setIsLoading(true);
      const timerId = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  };

  const getBackgroundColor = (isActive: boolean) => {
    return isActive ? color.white : color.dark_light_2;
  };

  const getTextColor = (isActive: boolean) => {
    return isActive ? color.dark : color.white;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        {isShowExplore && (
          <Pressable style={styles.explore}>
            <Image
              source={icons.explore}
              resizeMode="contain"
              style={styles.icon}
            />
          </Pressable>
        )}
        <View style={styles.childContainer}>
          {listData?.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <Pressable
                key={index}
                onPress={() => chooseItem(index)}
                style={[
                  styles.iconContainer,
                  {backgroundColor: getBackgroundColor(isActive)},
                ]}>
                <Text style={[styles.text, {color: getTextColor(isActive)}]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: color.dark,

    paddingHorizontal: 10,
  },
  explore: {
    paddingHorizontal: 8,
    marginRight: 16,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: color.dark_light_2,
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: 12,
    marginRight: 8,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
  },
});
