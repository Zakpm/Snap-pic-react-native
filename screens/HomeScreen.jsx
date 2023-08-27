import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmail } from '../reducers/snap';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const regex = /\S+@\S+\.\S+/;

  const handlePress = () => {
    if (!regex.test(email.toLowerCase())) {
      setError(true);
    } else {
      navigation.navigate('TabNavigator', { screen: 'Gallery' });
      dispatch(addEmail(email));
      setEmail('');
      setError(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Image source={require('../assets/camera.png')} style={styles.image} />
        <Text style={styles.title}>SnapPic</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          {error && <Text style={styles.error}>Invalid email address</Text>}
          <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
            <Text style={styles.textButton}>Go to gallery</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  title: {
    fontSize: 60,
    position: 'absolute',
    top: '15%',
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: '60%',
    width: '80%',
    padding: 20,
    borderRadius: 7,
  },
  input: {
    borderBottomColor: 'tomato',
    borderBottomWidth: 1,
    fontSize: 17,
  },
  button: {
    backgroundColor: 'tomato',
    marginTop: 50,
    borderRadius: 7,
  },
  textButton: {
    textAlign: 'center',
    padding: 5,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
