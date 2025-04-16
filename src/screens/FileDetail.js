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

/* 
  Muito para melhorar aqui. refazer isso depois.
  Preciso recarregar o conteudo do arquivo toda vez
  fazer alguma alteração. chamar a função loadFileContent
  toda vez que isso acontecer
*/

import { useDatabase } from './DatabaseContext';
import { styles } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';

const FileDetail = ({ navigation: propNavigation }) => {
  const route = useRoute();
  const navigation = useNavigation() || propNavigation;
  const { fileId, fileName, fileContent: initialFileContent } = route.params; 
  const { database } = useDatabase();

  // Use um estado local para gerenciar o conteúdo do arquivo
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Este useEffect garante que o conteúdo seja sempre atualizado quando o componente for montado
  // ou quando os parâmetros da rota mudarem
  useEffect(() => {
    if (initialFileContent !== undefined) {
      setContent(initialFileContent);
    } else {
      // Carregar o conteúdo diretamente do banco de dados caso não venha na rota
      loadFileContent();
    }
  }, [fileId, initialFileContent]);
  
  // Função para carregar o conteúdo diretamente do banco de dados
  const loadFileContent = async () => {
    try {
      const statement = await database.prepareAsync(
        "SELECT conteudo FROM arquivos WHERE id = ?"
      );
      const result = await statement.executeAsync([fileId]);
      await statement.finalizeAsync();
      
      if (result && result.rows && result.rows.length > 0) {
        setContent(result.rows[0].conteudo);
      }
    } catch (error) {
      console.error("Erro ao carregar conteúdo do arquivo:", error);
    }
  };
  
  const handleSaveChanges = async () => {
    try {
      // Atualiza o banco de dados com o novo conteúdo
      const statement = await database.prepareAsync(
        "UPDATE arquivos SET conteudo = ? WHERE id = ?"
      );
      await statement.executeAsync([content, fileId]);
      await statement.finalizeAsync();
  
      // Atualiza os parâmetros da rota atual para manter a consistência
      navigation.setParams({ fileContent: content });
      
      // Se necessário, também podemos atualizar a tela anterior
      if (navigation.canGoBack()) {
        navigation.navigate({
          name: route.name,
          params: { updatedFileId: fileId, updatedContent: content },
          merge: true,
        });
      }
  
      //Alert.alert('Sucesso', 'Conteúdo atualizado com sucesso!');
      setIsEditing(false);
    } 
    catch (error) {
      console.error("Erro ao atualizar arquivo:", error);
      Alert.alert('Erro', 'Não foi possível atualizar o conteúdo: ' + error.message);
    }
  };

  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.folderContainer}>
          <Text style={styles.title}>Descrição do arquivo {fileName}</Text>
          
          {isEditing ? (
            <TextInput
              style={styles.contentTextInput}
              multiline={true}
              value={content}
              onChangeText={setContent}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.contentText}>{content}</Text>
            </TouchableOpacity>
          )}
          
          {isEditing && (
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.saveButtonText}>Salvar Alteração</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default FileDetail;
