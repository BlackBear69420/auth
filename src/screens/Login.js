import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { TextInput,Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          navigation.replace('Home');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error reading token from AsyncStorage:', error);
        setErrorMessage('Error accessing local storage.');
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      setSnackbarVisible(true)
      setLoading(false);
      return;
    }

    try {
      if (email === 'demo@gmail.com' && password === '12345') {
        await AsyncStorage.setItem('token', password);
        navigation.navigate('Home');
      }
      else {
        setErrorMessage('password:12345 & email:demo@gmail.com');
        setSnackbarVisible(true)
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setSnackbarVisible(true)
    }
    setLoading(false);
  };

  return (
    <LinearGradient
      colors={['#1338be', '#8235cf']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar backgroundColor='#1338be' barStyle='light-content'></StatusBar>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <View
            style={{
              width: '100%',
              marginTop: '30%',
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopEndRadius: 30,
              borderTopLeftRadius: 30,
              backgroundColor: 'white',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                },
                android: {
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                },
              }),
            }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 30, fontFamily: 'RobotoSlab-Black', color: 'black' }}>
                Welcome back!
              </Text>
              <Text style={{ fontSize: 15, fontFamily: 'RobotoSlab-Bold', marginBottom: 30 }}>
                Login to your account
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setErrorMessage('');
                }}
                style={styles.input}
                textColor='black'
                mode='outlined'
              />
              <TextInput
                label="Password"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setErrorMessage('');
                }}
                style={styles.input}
                secureTextEntry={!passwordVisible}
                textColor='black'
                mode='outlined'
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off" : "eye"}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleLogin}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', paddingTop: 10 }}
                onPress={() => navigation.navigate('LoginScreen')}
              >
                <Text style={{ fontSize: 17, color: 'black' }}>Not an user? </Text>
                <Text style={{ fontSize: 18, color: '#1338be', fontWeight: '700' }}>
                  Click here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
      <View style={styles.snackbarContainer}>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={styles.snackbar}>
          {errorMessage}
        </Snackbar>
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    gap: 30,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 15,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#1338be',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 10,
  },
  snackbar: {
    backgroundColor: '#ff4d4d',
    zIndex:100,
    top:0
  },
});
