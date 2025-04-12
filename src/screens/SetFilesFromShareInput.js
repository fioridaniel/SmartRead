import { 
  Alert 
} from 'react-native';

export const setSharedText = async (database, sharedText) => {
    if(!sharedText) {
        Alert.alert('Erro', 'texto compartilhado vazio');
        return;
    }

    /*
        1) pegar lista de todos os id's de arquivos marcados.
        2) atualizar os arquivos com o texto passado pelo share. 
    */

    /* é possivel fazer isso em uma query só */
    try {
        const selectedFiles = await database.getAllAsync('SELECT id FROM arquivos WHERE arquivos.is_selected = 1');
        
        for (const file of selectedFiles) {
            const statement = await database.prepareAsync(
                "UPDATE arquivos SET conteudo = conteudo || ? WHERE id = ?" /* adiciona o novo conteudo ao conteudo antigo */
            );
            await statement.executeAsync(['\n\n' + sharedText, file.id]); 
            await statement.finalizeAsync();
        }
        
        Alert.alert('Sucesso', `descrição"${sharedText}"`);
    } 
    
    catch (error) {
        console.error("Erro ao atualizar arquivo:", error);
        Alert.alert('Erro', 'Não foi possível passar o texto comparilhado para o arquivo: ' + error.message);
    }
}