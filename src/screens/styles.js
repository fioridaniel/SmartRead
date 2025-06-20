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
      contentText: {
        fontSize: 16,
        color: '#333',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 10,
        marginBottom: 20,
        lineHeight: 22,
      },
      header: {
        padding: 16,
        backgroundColor: '#4285F4',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      contentContainer: {
        flex: 1,
        padding: 16,
      },
      sharedTextContent: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
      },
      placeholderText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 40,
      },
      contentTextInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        minHeight: 100,
        textAlignVertical: 'top',
        marginVertical: 10,
      },
      saveButton: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
      },
      saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
      }
});
