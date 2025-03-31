import React, { useState } from 'react';
import 
{ 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert 
} from 'react-native';

import { styles } from './styles';

const LoginScreen = ({ navigation }) => 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email digitado:', email);
    console.log('Senha digitada:', password);
    
    // validação
    if (!email || !password) 
    {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // simulação de login
    if (email === 'user@example.com' && password === 'password123') 
    {
      Alert.alert('Success', 'Login Successful!');
      navigation.navigate('Home');
    } 

    else 
    {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        {/* Title */}
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        {/* Login Button */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;