import React from 'react';
import ItemCarrinho, {adicionarQuantidade, removerQuantidade} from "../../components/itemCarrinho";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/loading/index.tsx';
import Confirm from "../../components/confirm";
import {sleep} from "../../services/Time.ts";

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
    const [adicionados, setAdicionados] = React.useState<string[]>([])
    const [produtoAAdicionar, setProdutoAAdicionar] = React.useState('');

    const loadData = async () => {
        const token = await AsyncStorage.getItem("token")

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
                response.push({...produtoJson, quantidade: r.quantidade});
            } catch {
                response.push({
                    ean: r.codigoDeBarras,
                    quantidade: r.quantidade,
                    nome: r.codigoDeBarras,
                    cosmosImageUrl: '',
                });
            }
        }
        setCarrinho(response.filter(p => p.nome));
        setCarregado(true);
    }

    React.useEffect(() => {
        loadData().catch(console.log)
    }, [])

    return (
        <ScrollView>
            {!carregado && <Loading/>}
            {carregado && !carrinho.length && <Text>Nenhum item no carrinho</Text>}
            {carregado && carrinho.map(c => {
                return <ItemCarrinho
                    key={c.ean}
                    imageUrl={`https://cdn-cosmos.bluesoft.com.br/products/${c.ean}`}
                    title={c.nome}
                    qtd={c.quantidade}
                    ean={c.ean}
                    setAdicionado={(item, acao) => {
                        if (acao) {
                            setAdicionados([...adicionados, item])
                        } else {
                            setAdicionados(adicionados.filter(a => a != item))
                        }
                    }}

                />
            })}
            {carregado && <View style={{flexDirection: 'row', marginBottom: 20}}>
                <TextInput
                    placeholder="Novo Produto"
                    style={{borderWidth: 1, width: 50 * vw, left: 5 * vw}}
                    value={produtoAAdicionar}
                    onChangeText={setProdutoAAdicionar}
                />
                <TouchableOpacity onPress={() => {
                    setCarregado(false);
                    setProdutoAAdicionar('');
                    adicionarQuantidade(produtoAAdicionar, 1, (x) => {})
                        .then(() => sleep(1000))
                        .then(loadData)
                }} style={{...styles.finalizarCompra, left: 10 * vw}}>
                    <Text>Adicionar Produto</Text>
                </TouchableOpacity>
            </View>}
            {(carregado && !!carrinho.length) && <TouchableOpacity style={{...styles.finalizarCompra, marginBottom: 20}} onPress={async () => {
                if (!await Confirm('Tem certeza que deseja finalizar a compra? Todos os items adicionados serão removidos do carrinho')) {
                    return;
                }

                setCarregado(false);

                carrinho.filter(c => adicionados.includes(c.ean)).forEach(c => {
                    removerQuantidade(
                        c.ean,
                        c.quantidade,
                        (x) => {
                        },
                        c.nome,
                        true,
                        c.quantidade)
                        .then(() => sleep(1000))
                        .then(loadData);
                });
            }}>
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
