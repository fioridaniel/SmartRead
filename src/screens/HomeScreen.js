import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert 
} from 'react-native';

import * as SQLite from 'expo-sqlite';

const HomeScreen = ({ navigation }) => { // Removido async daqui
  const [folderName, setFolderName] = useState('');
  const [database, setDatabase] = useState(null);

  // Inicializar o banco de dados no useEffect
  useEffect(() => {
    const initDatabase = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('mydb');
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS folders (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            nome TEXT NOT NULL
          )
        `);
        setDatabase(db);
      } 
      
      catch (error) {
        console.error("Erro ao inicializar banco de dados:", error);
        Alert.alert('Erro', 'Não foi possível inicializar o banco de dados');
      }
    };

    initDatabase();

    // Limpeza ao desmontar o componente
    return () => {
      if (database) {
        database.closeAsync();
      }
    };
  }, []);

  const createFolder = async () => {
    if (!folderName) {
      Alert.alert('Erro', 'Por favor, insira o nome da pasta');
      return;
    }

    if (!database) {
      Alert.alert('Erro', 'Banco de dados não inicializado');
      return;
    }

    try {
      const statement = await database.prepareAsync(
        "INSERT INTO folders (nome) VALUES (?)"
      );
      await statement.executeAsync([folderName]);
      await statement.finalizeAsync();
      
      Alert.alert('Sucesso', `Pasta "${folderName}" criada com sucesso!`);
      setFolderName('');
    } 
    
    catch (error) {
      console.error("Erro ao criar pasta:", error);
      Alert.alert('Erro', 'Não foi possível criar a pasta: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Home</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da pasta"
          value={folderName}
          onChangeText={setFolderName}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={createFolder}
        >
          <Text style={styles.loginButtonText}>Criar Pasta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Estilos mantidos conforme seu código original
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  loginContainer: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;