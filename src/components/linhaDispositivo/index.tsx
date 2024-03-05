import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";

export default function LinhaDispositivo(props: any) {
    return (
        <View style={styles.container}>
            <View style={styles.nome}>
                <Text style={styles.font}>
                    { props.nome }
                </Text>
            </View>
            <View style={styles.detalhes}>
                <View style={styles.quantidade}>
                    <TouchableOpacity style={styles.botaoRemover}>
                        <Image
                            source={require('../../assets/lixo.png')}
                            style={{width: 4 * vw, height: 3 * vh, marginTop: 0.5 * vh}}
                            tintColor='white'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoRemover}>
                        <Image
                            source={require('../../assets/lixo.png')}
                            style={{width: 4 * vw, height: 3 * vh, marginTop: 0.5 * vh}}
                            tintColor='white'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 4 * vw,
        flexDirection: 'row',
    },
    nome: {
        width: 45 * vw,
    },
    detalhes: {
        marginLeft: 40 * vw,
    },
    quantidadeContainer: {
        alignItems: 'center',
        marginTop: 2 * vh,
    },
    quantidade: {
        flexDirection: 'row'
    },
    font: {
        fontSize: 18,
    },
    botaoRemover: {
        backgroundColor: '#f82d2d',
        borderRadius: 40,
        width: 6 * vw,
        height: 4 * vh,
        alignItems: 'center',
    },
    botaoText: {
        color: '#fff'
    },
})