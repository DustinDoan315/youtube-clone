import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {RootState} from '@redux/store';
import {login, logout, setUser} from '@redux/user/userSlice';
import Header from '@components/Header';
import {color} from '@theme/index';
import {authRoot, bottomRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user.isLoggedIn) {
      bottomRoot.navigate(router.ACCOUNT_SCREEN);
    }
  }, [user.isLoggedIn]);

  const handleSubmit = () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required.');
      setLoading(false);
      return;
    }

    dispatch(login({email, password}));
    setLoading(false);
  };

  const handleSignUp = () => {
    authRoot.navigate(router.SIGN_UP_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>
        {user.isLoggedIn ? 'Welcome' : 'Sign In'}
      </Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder={
            user.previousEmail?.length > 0 ? user.previousEmail : 'Email'
          }
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="Submit" onPress={handleSubmit} />
        )}
      </View>

      <Pressable
        onPress={handleSignUp}
        style={{
          alignItems: 'flex-end',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: color.primaryText,
            textDecorationLine: 'underline',
          }}>
          Create a new account
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: color.primaryBorder,
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
  },
});

export default SignInScreen;
