// src/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Adicione ao seu arquivo styles.js
      folderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
      },
      deleteIcon: {
        padding: 10,
      },
      folderButton: {
        flex: 1,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 8,
        marginRight: 10,
      },
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
      folderContainer: {
        width: '90%',
      },
      /*folderButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
      },*/
      folderText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
});
