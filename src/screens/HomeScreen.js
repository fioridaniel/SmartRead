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

const HomeScreen = ({ navigation }) => {
    // o que eu preciso para criar uma pasta
    const [folderName, setFolderName] = useState('');

    const createFolder = () => 
    {
        if(!folderName) 
        {
            Alert.alert('Error', 'Please enter all the data');
            return;
        }

        /*
            Logica para colocar o banco de dados (Expo). Converta a seguinte 
            tabela python para o react native. 

            class Pasta(models.Model):
                id = models.AutoField(primary_key=True)  # Campo ID gerado automaticamente
                nome = models.CharField(max_length=100)  # Campo para armazenar o nome
        */
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginContainer}>
                {/* Title */}
                <Text style={styles.title}>Home</Text>
        
                {/* Folder name */}
                <TextInput
                    style={styles.input}
                    placeholder="Folder name"
                    value={folderName}
                    onChangeText={setFolderName}
                    autoCapitalize="none"
                />
    
                {/* Create folder button */}
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={createFolder}
                >
                    <Text style={styles.loginButtonText}>Create Folder</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// Stylesheet (usando o mesmo do LoginScreen para consistência)
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