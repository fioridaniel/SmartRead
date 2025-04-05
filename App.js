import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importe a tela de Login
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FolderList from './src/screens/FolderList';
import FileList from './src/screens/FileList';
import FileDetail from './src/screens/FileDetail';
import FloatingButton from './src/screens/FloatingButton'
import { DatabaseProvider } from './src/screens/DatabaseContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    
    <DatabaseProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Login' }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Home' }}
          />
          <Stack.Screen 
            name="Folders" 
            component={FolderList} 
            options={{ title: 'Folders' }}
          />
          <Stack.Screen 
            name="Files" 
            component={FileList} 
            options={{ title: 'Files' }}
          />
          <Stack.Screen 
            name="FileDetail" 
            component={FileDetail} 
            options={{ title: 'FileDetail' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
};

export default App;