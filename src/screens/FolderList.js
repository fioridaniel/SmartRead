import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert 
} from 'react-native';

import { useDatabase } from './DatabaseContext';

const FolderList = ({ navigation }) => {
    const { database } = useDatabase(); 
    /*  Colocar entre chaves faz com que retorne a instancia direto. 
        Dessa forma, nao precisa colocar database.database.algumMetodo() 
    */

    const displayFoldersList = async () => {
        /*
            PSEUDO-CODIGO:
            1) pegar banco de dados
            2) se for diferente de null, itera sobre o banco mostrando todas as pastas
            3) cada pasta sera um link, de forma que podera acessar cada uma separadamente
        */

        if (!database) {
              Alert.alert('Erro', 'Banco de dados não inicializado');
              return;
            }
        
            /*
             *  Usar prepareAsync + executeAsync para fazer uma Query. 
             */
            try {
              allFolders = await database.getAllAsync('SELECT * FROM folders');
              // await folders.finalizeAsync();
            
              /* Imprime todas as pastas da table folders */
              for (const folder of allFolders) {
                console.log(folder.id, folder.nome);
              }
              
            } 
            
            catch (error) {
              console.error("Erro ao pegar o objeto pastas:", error);
              Alert.alert('Erro', 'Não foi possivel pegar o objeto da table folders' + error.message);
            }
    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Folders</Text>
            
            {
                /*
                    Iterar sobre o objeto folders, colocando
                    todos os objetos pastas aqui dentro. 
                */
            }

            <TouchableOpacity 
                style={styles.loginButton}
                onPress={displayFoldersList}
                >
                <Text style={styles.loginButtonText}>Lista de pastas</Text>
            </TouchableOpacity>
    
          </View>
        </SafeAreaView>
      );

}

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

export default FolderList;