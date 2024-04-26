import React from 'react';
import ItemCarrinho, {adicionarQuantidade, removerQuantidade} from "../../components/itemCarrinho";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal,useColorScheme } from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/loading/index.tsx';
import Confirm from "../../components/confirm";
import {sleep} from "../../services/Time.ts";
import Footer from '../../components/footer/index.tsx'; 


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
    const theme = useColorScheme(); // 'light' ou 'dark'
    const inputStyle = {        
        borderWidth: 1,
        width: 40 * vw,
        left: 5 * vw,
        color: theme === 'dark' ? 'black' : 'white', // Cor do texto baseada no tema  
        margin:10     
        
      };

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

    function callbackLoadData() {
        console.log('Carregando Dados')
        loadData().catch(console.log);
        setTimeout(() => {
            callbackLoadData();
        }, 5000);
    }

    React.useEffect(() => {
        callbackLoadData();
    }, [])

    return (
        <View style={{flex: 1}}>

        <ScrollView>
            {!carregado && <Modal
                animationType="fade"
                transparent={true}
                visible={!carregado}
            >
                <View style={styles.centeredView}>
                    <Loading />
                </View>
            </Modal>
            
            
            }
            {carregado && !carrinho.length && <Text style={styles.labelEspacado}>Nenhum item no carrinho</Text>}
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
                    style={inputStyle}
                    value={produtoAAdicionar}
                    placeholderTextColor="#000" // Definindo a cor do placeholder para preto
                    onChangeText={setProdutoAAdicionar}
                />
                <TouchableOpacity onPress={() => {
                    setCarregado(false);
                    setProdutoAAdicionar('');
                    adicionarQuantidade(produtoAAdicionar, 1, (x) => {})
                        .then(() => sleep(1000))
                        .then(loadData)
                }} style={{...styles.botao, marginLeft: 5 * vw,marginTop: 3 * vw}}>
                    <Text style={styles.textoBotao}>Adicionar Produto</Text>
                </TouchableOpacity>
            </View>}
            {(carregado && !!carrinho.length) && <TouchableOpacity style={{...styles.botao, marginBottom: 20,width:'50%',marginLeft:90}} onPress={async () => {
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
                <Text style={styles.textoBotao}>
                    Finalizar Compra
                </Text>
            </TouchableOpacity>}
        </ScrollView>
        <Footer/>
        </View>

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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para o modal
      },
      botao: {
        backgroundColor: '#007bff', // Esta é uma tonalidade comum de azul usada para botões
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
      labelEspacado:{
        margin:20,
        color: '#000', 

      }
      
})
