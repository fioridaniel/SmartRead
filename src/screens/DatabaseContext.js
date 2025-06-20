import React, { useState, useEffect, useContext, createContext } from 'react';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite'

const DatabaseContext = createContext({
    database: null,
  });
  
  export const DatabaseProvider = ({ children }) => {
    const [database, setDatabase] = useState(null);
  
    useEffect(() => {
      const initDatabase = async () => {
        try {
          const db = await SQLite.openDatabaseAsync('mydb');

          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS folders (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              nome TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS arquivos (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              nome TEXT NOT NULL,
              pasta_id INTEGER NOT NULL,
              conteudo TEXT,
              is_selected BOOLEAN,
              FOREIGN KEY (pasta_id) REFERENCES folders (id) ON DELETE CASCADE
            );
          `);
          setDatabase(db);
        } 
        
        catch (error) {
          console.error('Erro ao inicializar banco:', error);
          Alert.alert('Erro', 'Não foi possível iniciar o banco de dados');
        }
      };
  
      initDatabase();
  
      return () => {
        if (database) {
          database.closeAsync();
        }
      };
    }, []);
  
    return (
      <DatabaseContext.Provider value={{ database }}>
        {children}
      </DatabaseContext.Provider>
    );
  };
  
  export const useDatabase = () => useContext(DatabaseContext);