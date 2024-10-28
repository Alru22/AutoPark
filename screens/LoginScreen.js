import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

/*Da jeg ikke har en backend, og det ikke er en del af læringsmålene, så har jeg ikke lavet en funktionel login, men blot for at vise POC*/

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />

      <Button
        title="Log In"
        onPress={() => navigation.replace('Home')}
      />
      
      <TouchableOpacity onPress={() => alert('Forgot Password')}>
        <Text style={styles.link}>Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('Create New User')}>
        <Text style={styles.link}>Create New User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
