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

const AccountScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  const navigateToLoginScreen = () => {
    authRoot.navigate(router.SIGN_IN_SCREEN);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      {user.isLoggedIn ? (
        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={icons.avatar}
              style={{
                width: 50,
                height: 50,
                marginRight: 15,
              }}
              resizeMode="contain"
            />
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {user.email}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text></Text>
          </View>

          <Pressable
            onPress={handleLogout}
            style={{
              position: 'absolute',
              paddingHorizontal: 14,
              alignSelf: 'center',
              top: height - 300,
              left: width / 2.6,
              paddingVertical: 7,
              backgroundColor: color.highlight,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: color.white,
                fontWeight: 'bold',
              }}>
              Log out
            </Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={navigateToLoginScreen}
          style={{
            paddingHorizontal: 14,
            alignSelf: 'center',
            marginTop: height / 2.6,
            paddingVertical: 7,
            backgroundColor: color.highlight,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: color.white,
              fontWeight: 'bold',
            }}>
            Sign in/Sign up
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
});
