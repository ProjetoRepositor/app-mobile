import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
    imageUrl: string,
    title: string,
    qtd: number
}

export default function ItemCarrinho(props: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={{width: 20 * vw, height: 20 * vw}}
                    source={{
                        uri: props.imageUrl
                    }}
                    alt={props.title}
                />
            </View>
            <View style={styles.detalhes}>
                <Text style={styles.font}>
                    {props.title}
                </Text>
                <View style={styles.quantidadeContainer}>
                    <View style={styles.quantidade}>
                        <TouchableOpacity style={styles.botaoRemover}>
                            <Text style={{...styles.font, ...styles.botaoText}}> - </Text>
                        </TouchableOpacity>
                        <Text style={styles.font}> {props.qtd} </Text>
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
