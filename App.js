import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FolderList from './src/screens/FolderList';
import FileList from './src/screens/FileList';
import FileDetail from './src/screens/FileDetail';
import { DatabaseProvider } from './src/screens/DatabaseContext';

const Stack = createStackNavigator();

const App = () => {
  const [sharedText, setSharedText] = useState(null);
  useEffect(() => {
    // Checar se o app foi aberto por compartilhamento
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        // O app foi aberto por um link/intent
        processOpenUrl({ url: initialUrl });
      }
    };
    
    // Listener para quando o app for aberto por compartilhamento
    const subscription = Linking.addEventListener('url', processOpenUrl);
    
    getInitialUrl();
    
    return () => subscription.remove();
  }, []);
  
  const processOpenUrl = (event) => {
    // Aqui você processa a URL ou os dados compartilhados
    console.log("Recebido:", event.url);
    
    // Para texto, geralmente você pode extrair da URL ou dos parâmetros
    // Exemplo simples (a implementação real depende da estrutura da URL)
    if (event.url.includes('text=')) {
      const text = decodeURIComponent(event.url.split('text=')[1]);
      setSharedText(text);
    }
  };  

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