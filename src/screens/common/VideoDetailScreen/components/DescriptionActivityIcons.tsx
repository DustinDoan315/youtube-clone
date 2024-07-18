import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {icons} from '@assets/index';
import {color} from '@theme/index';

interface IconButtonProps {
  icon: any;
  size: number;
  title: string | number;
  isDislike?: boolean;
}

const IconButton: React.FC<IconButtonProps> = memo(
  ({icon, size, title = '652', isDislike}) => (
    <Pressable style={[styles.button, {borderRadius: size}]}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, {width: size, height: size}]}
      />
      <Text style={styles.buttonText}>{title}</Text>

      {isDislike && (
        <View style={styles.dislikeContainer}>
          <View style={styles.separator} />
          <Image
            source={icons.dislike_outline}
            resizeMode="contain"
            style={[styles.icon, {width: size, height: size}]}
          />
        </View>
      )}
    </Pressable>
  ),
);

const DescriptionActivityIcons: React.FC = memo(() => (
  <View style={styles.scrollView}>
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollView}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <IconButton title={652} icon={icons.like_outline} size={16} isDislike />
        <IconButton title={'Share'} icon={icons.share_outline} size={16} />
        <IconButton
          title={'Download'}
          icon={icons.download_outline}
          size={16}
        />
        <IconButton title={'Cut'} icon={icons.cut_outline} size={16} />
        <IconButton title={'Save'} icon={icons.save_outline} size={16} />
        <IconButton title={'Disable'} icon={icons.disabled_outline} size={16} />
      </View>
    </ScrollView>
  </View>
));

export default DescriptionActivityIcons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  scrollView: {
    height: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
    flexDirection: 'row',
    backgroundColor: color.dark_light_1,
  },
  buttonText: {
    color: color.white,
    fontSize: 12,
  },
  dislikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: color.primaryText,
    marginRight: 5,
  },
  icon: {
    marginRight: 5,
  },
});
