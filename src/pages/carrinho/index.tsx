import React from 'react';
import ItemCarrinho, {adicionarQuantidade, removerQuantidade} from "../../components/itemCarrinho";
import {
    Alert, Button,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    // useColorScheme,
    View
} from "react-native";
import {vw} from "../../services/Tamanhos.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/loading/index.tsx';
import Confirm from "../../components/confirm";
import {sleep} from "../../services/Time.ts";
import Footer from '../../components/footer/index.tsx';
// @ts-ignore
import {styles} from "./styles.tsx";
import {DownloadFile} from "./download.ts";


const lightBlueColor = '#72C7FF'; // Azul claro da nuvem e do carrinho de compras
const orangeColor = '#FF6A13'; // Laranja do carrinho de compras

type CarrinhoApi = {
    codigoDeBarras: string,
    quantidade: number,
};


type StatusApi = {
    idTranscricao: string,
    situacaoAtual: string,
    textoRecebido?: string,
    produtoEncontrado?: string,
    quantidade?: number,
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
    // const theme = useColorScheme(); // 'light' ou 'dark'
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [modal2Visible, setModal2Visible] = React.useState<boolean>(false);
    const [exportList, setExportList] = React.useState<any[]>([]);
    const [statuses, setStatuses] = React.useState<StatusApi[]>([]);
    const [key, setKey] = React.useState(0);
    

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

    const loadStatuses = async (token: string) => {
        const myHeaders = new Headers();

        myHeaders.append("token", token);
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return await fetch("https://rq0ak44zy0.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/status", requestOptions)
            .then(r => r.json()).then(r=>r.filter((x: StatusApi) => x.situacaoAtual!=='Transcrição Concluída'));

    }

    const loadData = async () => {
        const token = await AsyncStorage.getItem("token")

        if (!token) return;

        setStatuses(await loadStatuses(token));

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
        setKey(key + 1);
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
    // console.log(carrinho);

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

                {
                    modal2Visible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal2Visible}
                        onRequestClose={() => setModal2Visible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={{...styles.modalContent, marginTop: 20, marginBottom: 20}}>
                                <ScrollView style={{marginBottom: 10}}>
                                    {exportList.map((item, index) => (
                                        <View key={index} style={{ marginBottom: 10 }}>
                                            <Text style={{color: 'black'}}>Data de Exportação: {item.exportDate.substring(0, 10)}</Text>
                                            <Text style={{color: 'black'}}>Quantidade de Itens: {item.quantidadeProdutos}</Text>
                                            <Button title="Baixar Arquivo" onPress={() => {
                                                DownloadFile(item.url).then((response) => Alert.alert("Exportação concluída", `Arquivo disponível em: ${response}`))
                                                setModal2Visible(false)
                                            }} />
                                        </View>
                                    ))}
                                </ScrollView>
                                <Button title="Fechar" onPress={() => setModal2Visible(false)} />
                            </View>
                        </View>
                    </Modal>

                    )
                }

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
                                adicionarQuantidade(produtoAAdicionar, 1, () => {})
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
                        key={c.ean + key}
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

                {statuses.map(s => (
                    <View style={styles.status} key={s.idTranscricao}>
                        <Text style={{ color: 'black', textAlign: 'center', width: '100%' }}>
                            {`${s.situacaoAtual}${
                                s.textoRecebido === null ? '' : '\n Texto Recebido: ' + s.textoRecebido
                            }`}
                        </Text>
                    </View>
                ))}

                {(carregado && !!carrinho.length) && (
                    <>
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
                                        () => {},
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
                        <TouchableOpacity
                            style={{...styles.botao, marginBottom: 20, width: '50%', marginLeft: 90}}
                            onPress={async () => {
                                if (!await Confirm('Tem certeza que deseja exportar seu carrinho para uma planilha excel?')) {
                                    return;
                                }
                                const myHeaders = new Headers();

                                const token = await AsyncStorage.getItem("token")

                                if (!token) return;

                                myHeaders.append("token", token);
                                myHeaders.append("Content-Type", "application/json");

                                const raw = JSON.stringify(carrinho.map(c => ({
                                    produto: c.nome,
                                    quantidade: c.quantidade,
                                })));

                                const requestOptions: RequestInit = {
                                    method: "POST",
                                    headers: myHeaders,
                                    body: raw,
                                    redirect: "follow"
                                };

                                const response = await fetch("https://rq0ak44zy0.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/carrinho/export", requestOptions)
                                    .then((response) => response.text())

                                // console.log(response)

                                const downlaod = await DownloadFile(JSON.parse(response).url);
                                Alert.alert("Exportação concluída", `Arquivo disponível em: ${downlaod}`)
                            }}
                        >
                            <Text style={styles.textoBotao}>
                                Exportar Carrinho
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{...styles.botao, marginBottom: 20, width: '50%', marginLeft: 90}}
                            onPress={async () => {
                                // console.log(1)
                                const myHeaders = new Headers();

                                // console.log(2)
                                const token = await AsyncStorage.getItem("token")

                                // console.log(3)
                                if (!token) return;

                                // console.log(4)
                                myHeaders.append("token", token);
                                myHeaders.append("Content-Type", "application/json");

                                // console.log(5)
                                const requestOptions: RequestInit = {
                                    method: "GET",
                                    headers: myHeaders,
                                    redirect: "follow"
                                };

                                // console.log(6)
                                await fetch("https://rq0ak44zy0.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/carrinho/export-history", requestOptions)
                                    .then((response) => response.json())
                                    .then((result) => {
                                        setExportList(result.exports);
                                        setModal2Visible(true);
                                    })
                                    .catch((error) => console.error(error));
                            }}
                        >
                            <Text style={styles.textoBotao}>
                                Histórico Exportações
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
            <Footer/>
        </View>
    );
}

// @ts-ignore