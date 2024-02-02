import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ItemCarrinho() {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={{width: 20 * vw, height: 20 * vw}}
                    source={{
                        uri: "https://superpao.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fsuperpao.vtexassets.com%2Farquivos%2Fids%2F366406%2FCreme-De-Leite-Leve-Uht-Homogeneizado-Piracanjuba-Caixa-200G.jpg%3Fv%3D638376717684430000"
                    }}
                    alt="Creme de Leite"
                />
            </View>
            <View style={styles.detalhes}>
                <Text style={styles.font}>
                    Creme de Leite Piracanjuba 200g
                </Text>
                <View style={styles.quantidadeContainer}>
                    <View style={styles.quantidade}>
                        <TouchableOpacity style={styles.botaoRemover}>
                            <Text style={{...styles.font, ...styles.botaoText}}> - </Text>
                        </TouchableOpacity>
                        <Text style={styles.font}> 5 </Text>
                        <TouchableOpacity style={styles.botaoAdicionar}>
                            <Text style={{...styles.font, ...styles.botaoText}}> + </Text>
                        </TouchableOpacity>
                        <BouncyCheckbox text="Adicionado" style={styles.detalhes} />
                    </View>
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
    detalhes: {
        marginLeft: 5 * vw,
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
    botaoAdicionar: {
        backgroundColor: '#50fa37',
        borderRadius: 40,
        width: 5 * vw,
        height: 4 * vh,
        alignItems: 'center',
    },
    botaoRemover: {
        backgroundColor: '#f82d2d',
        borderRadius: 40,
        width: 5 * vw,
        height: 4 * vh,
        alignItems: 'center',
    },
    botaoText: {
      color: '#fff'
    },
})