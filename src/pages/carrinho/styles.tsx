import {StyleSheet} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";


const lightBlueColor = '#72C7FF'; // Azul claro da nuvem e do carrinho de compras
const orangeColor = '#FF6A13'; // Laranja do carrinho de compras

export const styles = StyleSheet.create({   
    status: {
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
        height: 50
    },
    textoBotao: {
        color: '#ffffff', // Texto branco para contraste com o fundo azul
        fontSize: 16, // Tamanho do texto
        fontWeight: 'bold', // Texto em negrito
    },
    labelEspacado: {
        margin: 20,
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
        marginTop: 10,
    }
})