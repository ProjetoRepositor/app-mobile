import React from 'react';
import {View, Text, StyleSheet, TextInput, PermissionsAndroid, Button, Alert, VirtualizedList,TouchableOpacity} from 'react-native';
import WifiManager from 'react-native-wifi-reborn'
import BluetoothClassic from 'react-native-bluetooth-classic';
import RNPickerSelect, {PickerStyle} from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from '../../components/footer/index.tsx'; 


const primaryColor = '#FF6A13'; // Laranja
const secondaryColor = '#72C7FF'; // Azul claro
const backgroundColor = '#0A2240'; // Azul escuro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        width:'100%',
        color:'black'
    },
    item: {
        fontSize: 18,
    width: '90%',
    borderRadius: 10,
    borderColor: primaryColor,
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    color:'black',
    },
    texto: { 
        color: secondaryColor,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      button: {
        marginTop: 10,
        backgroundColor: '#FF6A13', // Fundo laranja do carrinho de compras
        borderRadius: 20,
        padding: 15,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      footer:{
        color:'white'
      },
      botao: {
        backgroundColor: primaryColor, // Botões laranja
        paddingHorizontal: 15, // Espaçamento horizontal dentro do botão
        paddingVertical: 3, // Espaçamento vertical dentro do botão
        borderRadius: 5, // Bordas arredondadas para o botão
        alignItems: 'center', // Centraliza o texto horizontalmente
        justifyContent: 'center', // Centraliza o texto verticalmente
        height:50
      },
      textoBotao: {
        color: '#ffffff', // Texto branco para contraste com o fundo azul
        fontSize: 16, // Tamanho do texto
        fontWeight: 'bold', // Texto em negrito
      },
});

async function connectToRaspberry() {
    const bondedDevices = await BluetoothClassic.getBondedDevices();
    const hc05 = bondedDevices.find(x => x.name == 'HC-05')
    if (!hc05) return false;
    let attempts = 0;
    while (true) {
        if (attempts > 3) return false;
        try {
            await hc05.connect();
            break;
        }
        catch {
            attempts += 1;
        }
    }
    return true;
}

async function getHc05Device() {
    const bondedDevices = await BluetoothClassic.getBondedDevices();
    return bondedDevices.find(x => x.name == 'HC-05')
}

async function listarWifi() {
    const wifiList = await WifiManager.loadWifiList();
    const list = wifiList.map(w => w.SSID);
    const set = new Set(list);
    return [...set];
}

async function sendData(ssid: string, password: string, token: string, navigarion: any) {
    const hc05 = await getHc05Device();
    hc05?.write(JSON.stringify({
        ssid,
        password,
        token,
    }));
    Alert.alert('Wifi do dispositivo configurado');
    navigarion.goBack()
}

const AdicionarDispositivo = (props: any) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT).then();

    const [connected, setConnected] = React.useState(false);

    const [wifis, setWifis] = React.useState<string[]>([]);

    const [ssid, setSsid] = React.useState('');

    const [password, setPassword] = React.useState('');

    if (!wifis.length) listarWifi().then(setWifis)

    if (!connected) {
        connectToRaspberry().then(setConnected);
    }
    return (
        <View style={styles.container}>
            {connected && <View style={styles.container}>
                <Text style={styles.texto}>Wi fi</Text>
                <RNPickerSelect
                    items={wifis.map(w => ({label: w, value: w}))}
                    value={ssid}
                    onValueChange={setSsid}
                    style={styles.item as PickerStyle}
                    placeholder={{
                        label: 'Selecione um Wi Fi...',  // Texto do placeholder
                        value: null,                       // Valor geralmente é null para placeholders
                        color: '#9EA0A4',                  // Cor opcional do texto do placeholder
                      }}
                />
                <Text style={styles.texto}>Senha</Text>
                <TextInput
                    style={styles.item}
                    placeholder='Senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TouchableOpacity 
                        style={{...styles.botao, marginBottom: 20, width: '50%'}} 
                        onPress={async () => {
                            AsyncStorage.getItem('token')
                            .then((token) => sendData(ssid, password, token!, props.navigation))
                        }}
                    >
                        <Text style={styles.textoBotao}>
                            Conectar
                        </Text>
                    </TouchableOpacity>
                {/* <View style={styles.button}>
               
                </View> */}
            </View>}
            {!connected && <Text style={styles.texto}>Não conectado</Text>}
            <Footer />
            
        </View>
    );
};



export default AdicionarDispositivo;
