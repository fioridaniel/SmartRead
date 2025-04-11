  import React, { useState, useEffect, useContext } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import LoginScreen from './src/screens/LoginScreen';
  import HomeScreen from './src/screens/HomeScreen';
  import FolderList from './src/screens/FolderList';
  import FileList from './src/screens/FileList';
  import FileDetail from './src/screens/FileDetail';
  import { DatabaseProvider } from './src/screens/DatabaseContext';
  import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
  import { Alert } from 'react-native';

  import { useDatabase } from './src/screens/DatabaseContext';
  import { setSharedText } from './src/screens/SetFilesFromShareInput';

  const Stack = createStackNavigator();

  const InternApp = () => {
    const { database } = useDatabase();
    const [receivedText, setReceivedText] = useState('');

    useEffect(() => {
      ReceiveSharingIntent.getReceivedFiles(
        (files) => {

          if (files.length > 0 && files[0].text) {

            setReceivedText(files[0].text);
            Alert.alert("texto recebido = "+files[0].text);

          }
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        ReceiveSharingIntent.clearReceivedFiles();
      };
    }, []); /* TIRAR ESSA MERDA */
    /* 
      O useEffect aqui é chamado quando o banco esta pronto (mais seguro). 
      Não é chamado quando eu altero alguma coisa dentro do banco 
    */

      useEffect(() => {
        if (receivedText && database) {
          setSharedText(database, receivedText);
        }
      }, [receivedText, database]); // Processa quando ambos estiverem prontos

    return (
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
    );
  }

  const App = () => {
    return (
      <DatabaseProvider>
        <InternApp />
      </DatabaseProvider>
    );
  };

  export default App;