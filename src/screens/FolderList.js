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
import Icon from 'react-native-vector-icons/FontAwesome';

const FolderList = ({ navigation }) => {
    const [allFolders, setAllFolders] = useState([]);
    const { database } = useDatabase(); 

    /*  
        Colocar entre chaves faz com que retorne a instancia direto. 
        Dessa forma, nao precisa colocar database.database.algumMetodo() 
    */

    /*  Adicionar a função de apagar uma pasta  */

    const displayFoldersList = async () => {
        /*
            PSEUDO-CODIGO:
            1) pegar banco de dados
            2) se for diferente de null, itera sobre o banco mostrando todas as pastas
            3) cada pasta sera um link, de forma que podera acessar cada uma separadamente
        */

            
        /* 
            Em allFolder.map é onde o loop acontece.
            Em cada pasta terá um link para
            acessa-la. Quando clicar no link, 
            o usuário será direcionado para 
            aquela pasta.

            Parametros que eu quero passar para FileList().
            onPress={navigation.navigate('Files', {folderId: folder.id, folderName:folder.nome})}> 
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

    /* Passar o id da pasta selecionada */
    const deleteFolderById = async (id) => {
      /* Logica:
          Fazer uma consulta ao banco, para pegar o objeto 
        com o determinado ID. Remover o objeto. simples.
      */

        let statement = await database.prepareAsync(
          "DELETE FROM folders WHERE folders.id = ?"
        );

        try {
          await statement.executeAsync([id]);
          await statement.finalizeAsync();
          console.log('Consulta realizada');
        } 
        
        catch (error) {
          console.error("Erro ao criar pasta:", error);
          Alert.alert('Erro', 'Não foi possível criar a pasta: ' + error.message);
        }

    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Folders</Text>
      
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={displayFoldersList}
                >
                <Text style={styles.loginButtonText}>Lista de pastas</Text>
            </TouchableOpacity>

            <View style={styles.folderContainer}>
              <Text style={styles.title}>Minhas Pastas</Text>
              {
              /*  
                Ao lado do nome de cada pasta, quero adicionar
                  um icone de lixeira, para poder apagar aquela
                  pasta. quero passar o id dessa determinada pasta
                  para a funcao deleteFolderById. Como fazer isso?
              */
              }
              
              {allFolders.map((folder) => (
                <View key={folder.id} style={styles.folderRow}>
                  <TouchableOpacity 
                    style={styles.folderButton}
                    onPress={() => navigation.navigate('Files', {
                      folderId: folder.id, 
                      folderName: folder.nome
                    })}
                  >
                    <Text style={styles.folderText}>{folder.nome}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.deleteIcon}
                    onPress={() => {
                      // Confirmação antes de deletar
                      Alert.alert(
                        "Deletar Pasta",
                        `Tem certeza que deseja deletar a pasta "${folder.nome}"?`,
                        [
                          {
                            text: "Cancelar",
                            style: "cancel"
                          },
                          { 
                            text: "Deletar", 
                            onPress: async () => {
                              await deleteFolderById(folder.id);
                              // Após deletar, atualizar a lista de pastas
                              displayFoldersList();
                            },
                            style: "destructive"
                          }
                        ]
                      );
                    }}
                  >
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))}

            </View>
    
          </View>
        </SafeAreaView>
      );

}

export default FolderList;