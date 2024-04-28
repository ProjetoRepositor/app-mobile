import React from 'react';
import ItemCarrinho, {adicionarQuantidade, removerQuantidade} from "../../components/itemCarrinho";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal,useColorScheme } from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/loading/index.tsx';
import Confirm from "../../components/confirm";
import {sleep} from "../../services/Time.ts";
import Footer from '../../components/footer/index.tsx'; 

const lightBlueColor = '#72C7FF'; // Azul claro da nuvem e do carrinho de compras
const orangeColor = '#FF6A13'; // Laranja do carrinho de compras


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
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);

    const handleAddProduct = () => {
        setModalVisible(false); // Fecha o modal após adicionar
    };
    
    const inputStyle = {
        borderWidth: 1,
        borderColor: orangeColor, // Bordas laranjas
        borderRadius: 5, // Cantos arredondados
        width: 40 * vw,
        padding: 10, // Padding para o texto não ficar colado nas bordas
        margin: 10,
        color: '#FFFFFF', // Texto branco
        backgroundColor: lightBlueColor, // Fundo azul claro
        shadowColor: '#000', // Sombra para dar um efeito elevado
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        <View style={styles.containerPrincipal}>
            <ScrollView>
                {!carregado && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={!carregado}
                    >
                        <View style={styles.centeredView}>
                            <Loading />
                        </View>
                    </Modal>
                )}
                
                {carregado && (
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                          <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                    
                </View>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Novo Produto"
                                style={inputStyle}
                                value={produtoAAdicionar}
                                onChangeText={setProdutoAAdicionar}
                                placeholderTextColor="black"
                            />
                              <TouchableOpacity 
                            onPress={() => {
                                setCarregado(false);
                                setProdutoAAdicionar('');
                                adicionarQuantidade(produtoAAdicionar, 1, (x) => {})
                                    .then(() => sleep(1000))
                                    .then(loadData)
                                handleAddProduct();
                            }} 
                            style={{...styles.botao, marginLeft: 5 * vw, marginTop: 3 * vw}}
                        >
                                <Text style={styles.textoBotao}>Adicionar Produto</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                    </View>
                )}
    
                {carregado && !carrinho.length && <Text style={styles.labelEspacado}>Nenhum item no carrinho</Text>}
                {carregado && carrinho.map(c => (
                    <ItemCarrinho
                        key={c.ean}
                        imageUrl={`https://cdn-cosmos.bluesoft.com.br/products/${c.ean}`}
                        title={c.nome}
                        qtd={c.quantidade}
                        ean={c.ean}
                        setAdicionado={(item, acao) => {
                            if (acao) {
                                setAdicionados([...adicionados, item])
                            } else {
                                setAdicionados(adicionados.filter(a => a !== item))
                            }
                        }}
                    />
                ))}
    
                {(carregado && !!carrinho.length) && (
                    <TouchableOpacity 
                        style={{...styles.botao, marginBottom: 20, width: '50%', marginLeft: 90}} 
                        onPress={async () => {
                            if (!await Confirm('Tem certeza que deseja finalizar a compra? Todos os items adicionados serão removidos do carrinho')) {
                                return;
                            }
                            setCarregado(false);
                            carrinho.filter(c => adicionados.includes(c.ean)).forEach(c => {
                                removerQuantidade(
                                    c.ean,
                                    c.quantidade,
                                    (x) => {},
                                    c.nome,
                                    true,
                                    c.quantidade
                                )
                                .then(() => sleep(1000))
                                .then(loadData);
                            });
                        }}
                    >
                        <Text style={styles.textoBotao}>
                            Finalizar Compra
                        </Text>
                    </TouchableOpacity>
                )}
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
        backgroundColor: orangeColor, // Botões laranja
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

      },
      containerPrincipal: { // Adicione este novo estilo
        flex: 1,
        backgroundColor: '#0A2240', 
        paddingBottom: 50,
      },
      addButton: {
        width: 70,
        height: 70,
        borderRadius: 25,
        backgroundColor: '#FF6A13',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
    },
    addButtonText: {
        fontSize: 40,
        color: '#FFFFFF',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center'
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    closeButtonText: {
        fontSize: 20,
        color: '#FF6A13',
    },
    addButtonContainer: {
        flexDirection: 'row', // Ensures horizontal layout
        justifyContent: 'center', // Centers the content horizontally
        width: '100%', // Takes full width to allow centering
        marginBottom: 0, // Space below the button
        marginTop:10,
    },
      
})
