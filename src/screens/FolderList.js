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
import { styles } from './styles';

const FolderList = ({ navigation }) => {
    const [allFolders, setAllFolders] = useState([]);
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
              folders = await database.getAllAsync('SELECT * FROM folders');
              setAllFolders(folders);
              
              /* Imprime todas as pastas da table folders no log */
              console.log("\nloop:\n");
              for (const folder of folders) {
                console.log(folder.id, folder.nome);
              }
            } 
            
            catch (error) {
              console.error("Erro ao pegar o objeto pastas:", error);
              Alert.alert('Erro', 'Não foi possivel pegar o objeto da table folders.\n' + error.message);
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

            <View style={styles.folderContainer}>
              <Text style={styles.title}>Minhas Pastas</Text>

              {/* Aqui é onde o loop acontece */}
              {allFolders.map((folder) => (
                <TouchableOpacity key={folder.id} style={styles.folderButton}>
                  <Text style={styles.folderText}>{folder.nome}</Text>
                </TouchableOpacity>
              ))}
            </View>
    
          </View>
        </SafeAreaView>
      );

}

export default FolderList;