import {Alert, PermissionsAndroid} from "react-native";
import RNFetchBlob from "rn-fetch-blob";

export async function DownloadFile (url: string) {
    // Verifique se o usuário concedeu permissão para armazenamento externo
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: 'Permissão de Armazenamento',
            message: 'Este aplicativo precisa de permissão para armazenar arquivos.',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
        },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permissão de armazenamento negada');
        return;
    }

    // Caminho onde o arquivo será salvo
    const path = `${RNFetchBlob.fs.dirs.DownloadDir}/export-cartninja.xlsx`;

    // Faça o download do arquivo
    await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path,
            description: 'Downloading file.',
        },
    }).fetch('GET', url);

    return path;
}