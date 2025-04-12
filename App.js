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
  import MlkitOcr from 'react-native-mlkit-ocr';

  const Stack = createStackNavigator();

  const extractTextFromImage = async (uri) => {
    try {
      const resultFromFile = await MlkitOcr.detectFromUri(uri);
      Alert.alert("resultado " +resultFromFile);
      /* juntando tudo em uma string só com o join */
      const allTexts = resultFromFile.map(block => block.text).join('\n');
  
      return allTexts;
    } 
    
    catch (error) {
      console.error('Erro ao extrair texto da imagem:', error);
      return ''; 
    }
  };

  const InternApp = () => {
    const { database } = useDatabase();
    const [receivedText, setReceivedText] = useState('');

    console.log("tamo programando tamo programando 1");

    useEffect(() => {
      ReceiveSharingIntent.getReceivedFiles(
        async (files) => {

          /*  
            Nesse codigo, por enquanto so pode enviar um arquivo
            por vez. 
          */

          const item = files[0];
          console.log("tamo programando tamo programando 2");

          if (files.length > 0 && item.text) {

            setReceivedText(item.text);
            Alert.alert("texto recebido = "+item.text);

          }

          else if (item.filePath) {

            // (documentação da biblioteca) files returns as JSON Array example
            //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]

            console.log("caminho da imagem recebida = "+item.contentUri);
            Alert.alert("caminho da imagem recebida = "+item.contentUri);
            
            const textoExtraido = await extractTextFromImage(item.contentUri);

            if (textoExtraido) {
              console.log("texto da imagem recebida = "+textoExtraido)
              Alert.alert("texto da imagem recebida = "+textoExtraido);
              setReceivedText(textoExtraido);
            }

            else {
              Alert.alert("nao foi possivel extrair o texto da imagem (sou gay)");
            }
            
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