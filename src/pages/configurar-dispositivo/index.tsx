import React from 'react';
import {View, Text, StyleSheet, TextInput, PermissionsAndroid, Button, Alert} from 'react-native';
import WifiManager from 'react-native-wifi-reborn'
import BluetoothClassic from 'react-native-bluetooth-classic';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        fontSize: 18,
        width: 300,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        margin: 20,
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
    return wifiList.map(w => w.SSID);
}

async function sendData(ssid: string, password: string, token: string) {
    const hc05 = await getHc05Device();
    hc05?.write(JSON.stringify({
        ssid,
        password,
        token,
    }));
}

const AdicionarDispositivo = (props: any) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then();

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
                <RNPickerSelect
                    items={wifis.map(w => ({label: w, value: w}))}
                    value={ssid}
                    onValueChange={setSsid}
                />
                <TextInput
                    style={styles.item}
                    placeholder='Senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <Button
                    title="Conectar" onPress={() => {
                    AsyncStorage.getItem('token')
                        .then((token) => sendData(ssid, password, token!))
                }} />
            </View>}
            {!connected && <Text>Não conectado</Text>}
        </View>
    );
};

export default AdicionarDispositivo;
