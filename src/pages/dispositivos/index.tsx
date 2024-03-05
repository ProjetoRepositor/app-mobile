import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";
import LinhaDispositivo from "../../components/linhaDispositivo";

export default function Dispositivos(props: any) {
    return (
        <ScrollView>
            <LinhaDispositivo nome="Dispositivo do Zeca" />
            <LinhaDispositivo nome="Dispositivo do Zeca" />
            <LinhaDispositivo nome="Dispositivo do Zeca" />
            <LinhaDispositivo nome="Dispositivo do Zeca" />
            <TouchableOpacity style={styles.finalizarCompra} onPress={() => props.navigation.navigate('AdicionarDispositivo')}>
                <Text>
                    Adicionar Dispositivo
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    finalizarCompra: {
        width: 30 * vw,
        left: 60 * vw,
        height: 7 * vh,
        backgroundColor: '#40ff64',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    }
})