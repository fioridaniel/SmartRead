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

const FileList = ( {navigation} ) => {
  const route = useRoute();  
  const { folderName, folderId } = route.params; 

  console.log("\nfolderName = %s, folderId = %s\n", folderName, folderId);
  
  return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Files on this Folder</Text>
          </View>
        </SafeAreaView>
      );
}

export default FileList;

