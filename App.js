import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FolderList from './src/screens/FolderList';
import FileList from './src/screens/FileList';
import FileDetail from './src/screens/FileDetail';
import { DatabaseProvider } from './src/screens/DatabaseContext';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { Alert } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [receivedText, setReceivedText] = useState('');

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files) => {
        Alert.alert("texto recebido 1 = "+files);
        Alert.alert("texto recebido 2 = " + JSON.stringify(files));
        if (files.length > 0 && files[0].text) {
          setReceivedText(files[0].text);
          Alert.alert("texto recebido 3 = " + JSON.stringify(files));
          Alert.alert("texto recebido 4 = "+files[0].text);
          Alert.alert("texto recebido 5 = "+files);
          console.log("texto recebido = "+files[0].text);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    };
  }, []);

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