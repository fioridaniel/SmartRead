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
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

/* 
  PSEUDO-CODIGO PARA TRATAR ESSA BAGAÇA

  Esse componente é chamado quando la em FolderList, o usuário 
  clicou em alguma pasta, daí ele é re-direcionado para cá, onde
  será mostrado todos os arquivos referentes à aquela pasta que 
  ele clicou. Além disso, Ele terá a opçao de criar um arquivo
  dentro da respectiva pasta, bem como de excluir um arquivo. 

  Dados que eu preciso:
  1) nome da pasta
  2) nome dos arquivos daquela pasta -> uma query simples resolve isso

  Como fazer isso?
  1) -> Passar o nome da pasta por parametro? é possivel?
  2) -> Passar o id da pasta, e pegar os arquivos
*/

const FileList = ({ navigation }) => {
  const route = useRoute();  
  const { folderName, folderId } = route.params; 
  const { database } = useDatabase();
  const [allFiles, setAllFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileText, setFileText] = useState('');

  /* Este useEffect vai executar a função displayFilesList quando o componente montar */
  useEffect(() => {
    displayFilesList();
  }, []); /* Array vazio significa que isso só acontece uma vez quando o componente monta */

  const createFile = async () => {

    /* Pegar esses dados la embaixo no return */
    if (!fileName) {
      Alert.alert('Erro', 'Por favor, insira o nome do arquivo');
      return;
    }
    
    if (!database) {
      Alert.alert('Erro', 'Banco de dados não inicializado');
      return;
    }

    /*
      *  Usar prepareAsync + executeAsync para fazer uma Query. 
      */
     const statement = await database.prepareAsync(
       "INSERT INTO arquivos (nome, pasta_id, conteudo) VALUES (?, ?, ?)"
     );
    try {
      await statement.executeAsync([fileName, folderId, fileText]);
      await statement.finalizeAsync();
      
      Alert.alert('Sucesso', `Arquivo com nome "${fileName}"\n
        descrição"${fileText}"\n
        e id de pasta${folderId}" criado com sucesso!`);
      
      setFileName('');
      setFileText('')
      displayFilesList();
    } 
    
    catch (error) {
      console.error("Erro ao criar arquivo:", error);
      Alert.alert('Erro', 'Não foi possível criar o arquivo: ' + error.message);
    }
  }

  const displayFilesList = async () => {
      if (!database) {
        Alert.alert('Erro', 'Banco de dados não inicializado');
        return;
      }
  
      /*
        *  Usar prepareAsync + executeAsync para fazer uma Query. 
      */
    
      try {
        const files = await database.getAllAsync('SELECT * FROM arquivos WHERE pasta_id = ?', [folderId]);
        setAllFiles(files);
        
        /* Imprime todas os arquivos de uma determinada pasta no log */
        console.log("\nloop arquivos:\n");
        for (const file of files) {
          console.log(file.id, file.nome, file.pasta_id, file.conteudo);
        }
      } 
      
      catch (error) {
        console.error("Erro ao pegar o objeto arquivos:", error);
        Alert.alert('Erro', 'Não foi possivel pegar o objeto da table arquivos.\n' + error.message);
      }
  }

  const deleteFileById = async (id) => {
    let statement = await database.prepareAsync(
      "DELETE FROM arquivos WHERE arquivos.id = ?"
    );

    try {
      await statement.executeAsync([id]);
      await statement.finalizeAsync();
      console.log('Consulta realizada');
    } 
    
    catch (error) {
      console.error("Erro ao deletar o arquivo:", error);
      Alert.alert('Erro', 'Não foi possível deletar o arquivo: ' + error.message);
    }
  } 

  const navigateToFileDetail = (fileId, fileName, fileContent) => {
    navigation.navigate('FileDetail', {
      fileId,
      fileName,
      fileContent
    });
  }
  
  return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loginContainer}>
            <View style={styles.folderContainer}>
              <Text style={styles.title}>Arquivos na pasta {folderName}</Text>

              <TextInput
                style={styles.input}
                placeholder="Nome do arquivo"
                value={fileName}
                onChangeText={setFileName}
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Descrição/conteúdo do arquivo"
                value={fileText}
                onChangeText={setFileText}
                autoCapitalize="none"
              />

              <TouchableOpacity 
                style={[styles.loginButton, { marginBottom: 10 }]}
                onPress={createFile}
              >
                <Text style={styles.loginButtonText}>Criar Arquivo</Text>
              </TouchableOpacity>

          </View>

          <View style={styles.folderContainer}>
            <Text style={styles.title}>Meus arquivos</Text>
            {allFiles.map((file) => (
              <View key={file.id} style={styles.folderRow}>
                <TouchableOpacity 
                  style={styles.folderButton}
                  onPress={() => navigateToFileDetail(file.id, file.nome, file.conteudo)}
                >
                  <Text style={styles.folderText}>{file.nome}</Text>
                  {/* Faltou um bloco de codigo aqui, pegar depois em FolderList */}
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.deleteIcon}
                  onPress={() => {
                    // Confirmação antes de deletar
                    Alert.alert(
                      "Deletar Arquivo",
                      `Tem certeza que deseja deletar o arquivo? "${file.nome}"?`,
                      [
                        {
                          text: "Cancelar",
                          style: "cancel"
                        },
                        { 
                          text: "Deletar", 
                          onPress: async () => {
                            await deleteFileById(file.id);
                            // Após deletar, atualizar a lista de pastas
                            displayFilesList();
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

export default FileList;

