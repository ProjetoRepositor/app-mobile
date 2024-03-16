import React from 'react';
import ItemCarrinho from "../../components/itemCarrinho";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { vh, vw } from "../../services/Tamanhos.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/loading/index.tsx';

type CarrinhoApi = {
    codigoDeBarras: string,
    quantidade: number,
};

type Carrinho = {
    ean: string,
    nome: string,
    cosmosImageUrl: string,
    quantidade: number,
}

export default function Carrinho() {
    const [carrinho, setCarrinho] = React.useState<Carrinho[]>([]);
    const [carregado, setCarregado] = React.useState<boolean>(false);

    React.useEffect(() => {
        AsyncStorage.getItem("token").then(async token => {
            if (!token) return;
            const response: Carrinho[] = [];
            const myHeaders = new Headers();

            myHeaders.append("token", token);
            const requestOptions: RequestInit = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const result = await fetch("https://rq0ak44zy0.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/carrinho", requestOptions);
            const resultJson: CarrinhoApi[] = await result.json();
            for (let i = 0; i < resultJson.length; i++) {
                const r = resultJson[i];
                const requestOptions: RequestInit = {
                    method: "GET",
                    redirect: "follow"
                };
                try {
                    const produto = await fetch(`https://vp4pbajd60.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/produto/${r.codigoDeBarras}`, requestOptions);
                    const produtoJson: Carrinho = await produto.json();
                    response.push({ ...produtoJson, quantidade: r.quantidade });
                }
                catch {
                    response.push({
                        ean: r.codigoDeBarras,
                        quantidade: r.quantidade,
                        nome: r.codigoDeBarras,
                        cosmosImageUrl: '',
                    });
                }
            }
            setCarrinho(response);
            setCarregado(true);
        });
    }, [])

    return (
        <ScrollView>
            {!carregado && <Loading />}
            {carregado && carrinho.map(c => {
                return <ItemCarrinho
                    key={c.ean}
                    imageUrl={`https://cdn-cosmos.bluesoft.com.br/products/${c.ean}`}
                    title={c.nome}
                    qtd={c.quantidade}
                    ean={c.ean}
                />
            })}
            {carregado && <TouchableOpacity style={styles.finalizarCompra}>
                <Text>
                    Finalizar Compra
                </Text>
            </TouchableOpacity>}
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
    },
})
