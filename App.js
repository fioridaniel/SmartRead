import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importe a tela de Login
import LoginScreen from './src/screens/LoginScreen';

// Crie outras telas que você precisar, por exemplo:
// import HomeScreen from './src/screens/HomeScreen';

// Crie o Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Adicione outras telas aqui, por exemplo:
        <Stack.Screen name="Home" component={HomeScreen} /> 
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;