import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {RootState} from '@redux/store';
import {logout, setUser} from '@redux/user/userSlice';
import Header from '@components/Header';
import {color} from '@theme/index';
import {bottomRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      setLoading(false);
      return;
    }

    dispatch(setUser({name, email, password}));
    setLoading(false);
    bottomRoot.navigate(router.ACCOUNT_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>{'Sign Up'}</Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
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

export default SignUpScreen;
