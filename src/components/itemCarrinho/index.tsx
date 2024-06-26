import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { vh, vw } from "../../services/Tamanhos.ts";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Confirm from "../confirm";

type Props = {
    ean: string,
    imageUrl: string,
    title: string,
    qtd: number,
    isSearch?: boolean,
    setAdicionado: (item: string, acao: boolean) => void,
}
const lightBlueColor = '#72C7FF'; // Azul claro da nuvem e do carrinho de compras

export async function adicionarQuantidade(ean: string, quantidade: number, setQuantidade: (x: number) => void) {
    const token = await AsyncStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append("token", token ?? '');
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "codigoDeBarras": ean,
        "quantidade": 1
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://rq0ak44zy0.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/carrinho", requestOptions)
        .catch((error) => console.error(error));

    setQuantidade(quantidade + 1)
}

export async function removerQuantidade(ean: string, quantidade: number, setQuantidade: (x: number) => void, nome: string, autoremove = false, quantidadeARemover = 1) {
    if (!autoremove && quantidade === 1) {
        if (!await Confirm(`Tem certeza que deseja exlcuir ${nome} do seu carrinho`)) {
            return;
        }
    }
    const token = await AsyncStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append("token", token ?? '');
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "codigoDeBarras": ean,
        "quantidade": quantidadeARemover
    });

    const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://rq0ak44zy0.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/carrinho", requestOptions)
        .catch((error) => console.error(error));

    const novaQuantidade = Math.max(quantidade - quantidadeARemover, 0);
    setQuantidade(novaQuantidade);
}
export default function ItemCarrinho(props: Props) {
    const [quantidade, setQuantidade] = React.useState(props.qtd);

    return (
        <>
            {(props.isSearch || (quantidade > 0)) && <View style={styles.container}>
                <View>
                    {props.imageUrl ? (
                        <Image
                            style={{ width: 20 * vw, height: 20 * vw }}
                            source={{ uri: props.imageUrl }}
                            alt={props.title}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>Sem imagem</Text>
                        </View>
                    )}
                </View>
                <View style={styles.detalhes}>
                    <Text style={styles.font}>
                        {props.title.substring(0, 26)}
                    </Text>
                    <Text style={styles.font}>
                        {props.title.substring(26, 52)}
                    </Text>
                    <Text style={styles.font}>
                        {props.title.substring(52, 78)}
                    </Text>
                    <View style={styles.quantidadeContainer}>
                        <View style={styles.quantidade}>
                            <TouchableOpacity style={styles.botaoRemover} onPress={() => removerQuantidade(props.ean, quantidade, setQuantidade, props.title)}>
                                <Text style={{ ...styles.font, ...styles.botaoText }}> - </Text>
                            </TouchableOpacity>
                            <Text style={styles.font}> {quantidade} </Text>
                            <TouchableOpacity style={styles.botaoAdicionar} onPress={() => adicionarQuantidade(props.ean, quantidade, setQuantidade)}>
                                <Text style={{ ...styles.font, ...styles.botaoText }}> + </Text>
                            </TouchableOpacity>
                            <BouncyCheckbox text="Adicionado" style={styles.detalhes} onPress={v => {
                                props.setAdicionado(props.ean, v)
                            }} />
                        </View>
                    </View>
                </View>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 4 * vw,
        flexDirection: 'row',
        backgroundColor: lightBlueColor,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        overflow: 'hidden', // Assegura que nada saia dos limites do container
    },
    detalhes: {
        marginLeft: 5 * vw,
        flex: 1, // Faz com que este View preencha todo o espaço restante
    },
    quantidadeContainer: {
        alignItems: 'center',
        marginTop: 2 * vh,
        width: 60 * vw,
    },
    quantidade: {
        flexDirection: 'row'
    },
    font: {
        fontSize: 18,
        color: 'black',
        flexShrink: 1, // Permite que o texto encolha para evitar quebrar o layout
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
    imagePlaceholder: {
        width: 20 * vw,
        height: 20 * vw,
        backgroundColor: '#ccc', // Cor de fundo para o placeholder
        justifyContent: 'center',
        alignItems: 'center',
      },
      placeholderText: {
        color: 'white',
        fontSize: 16,
      },
})
