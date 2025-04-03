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

const FileDetail = ({ navigation }) => {
  const route = useRoute();
  const { fileId, fileName, fileContent } = route.params; 
  const { database } = useDatabase();

  console.log("testando... descrição do arquivo = "+ fileContent);

  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.folderContainer}>
          <Text style={styles.title}>Descrição do arquivo {fileName}</Text>
          <Text style={styles.contentText}>{fileContent}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FileDetail;