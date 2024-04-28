import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  Image, 
} from 'react-native';
import {vh, vw} from '../../services/Tamanhos.ts';
import {contagemRegressiva} from "../../services/Time.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";

function navigateToCarrinho(navigation: any) {
  navigation.replace('Carrinho');
}

export default function Login(props: any) {

  React.useEffect(() => {
    AsyncStorage.getItem("token")
        .then(token => {
          if(token !== null) {
            navigateToCarrinho(props.navigation);
          }
        });
  }, []);

  const [senhaVisivel, setSenhaVisivel] = React.useState(false);

  const [email, setEmail] = React.useState("");

  const [senha, setSenha] = React.useState("");

  const [segundosFaltando, setSegundosFaltando] = React.useState(0);

  // verificaLogin(props.navigation);

  const solicitarNovamente = () => {
    solicitarSenha(email);
    contagemRegressiva(15, setSegundosFaltando);
  }

  const login = async (email: string, senha: string)=> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "senha": senha,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://uiuqq28cu9.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/autenticacao/conta/login", requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .then(obj => AsyncStorage.setItem("token", obj.token))
        .then(() => navigateToCarrinho(props.navigation))
        .catch(error => console.log('error', error));
  }

  const solicitarSenha = async (email: string) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "email": email
      });

      const requestOptions : RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch("https://uiuqq28cu9.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/autenticacao/conta/solicitar", requestOptions);
      const status = response.status;


      if (status === 201) {
        Alert.alert("Senha Enviada", "Senha enviada para o email informado");
      }
      else if (status == 200) {
        Alert.alert("Inscrição necessária", "Aceite a inscrição em seu email, depois tente novamente");
      }

    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <View style={styles.container}>
       <View style={styles.containerImagem}>
      <Image
        source={require('../../assets/Logo.jpeg')} // Substitua pelo caminho correto da sua imagem
        style={{ width: 200, height: 200, marginRight: 10 }} // Ajuste o tamanho conforme necessário
      />
      </View>
      <Text style={styles.texto}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#000" // Definindo a cor do placeholder para preto
        value={email}
        onChangeText={setEmail}
      />
     {senhaVisivel && <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#000" // Definindo a cor do placeholder para preto
        autoCapitalize="none"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
    />}
    {senhaVisivel && <Text>
      Não recebeu?
      {segundosFaltando == 0 &&
          <TouchableOpacity onPress={solicitarNovamente} style={styles.hyperlink}>
            <Text style={styles.hyperlinkText}>
              Solicitar nova senha.
            </Text>
          </TouchableOpacity>}
      {segundosFaltando > 0 &&
              ` Solicite novamente em ${segundosFaltando} segundo`}{segundosFaltando > 1 && 's'}
    </Text>}
      <TouchableOpacity style={styles.buttonLogin} onPress={() => {
        // login(props.navigation);
        if (!senhaVisivel) {
          solicitarSenha(email);
          setSenhaVisivel(true);
        } else {
          login(email, senha);
        }
        // Alert.alert("Login", "Corpo");
      }}>
        <Text style={styles.buttonLoginText}> { senhaVisivel ? 'Login' : 'Solicitar Senha' } </Text>
      </TouchableOpacity>
    </View>
  );
}
const primaryColor = '#FF6A13'; // Laranja
const secondaryColor = '#72C7FF'; // Azul claro
const backgroundColor = '#0A2240'; // Azul escuro

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to utilize the entire screen
    alignItems: 'center',
    justifyContent: 'center', // Center everything vertically and horizontally
    backgroundColor: backgroundColor, 
  },
  input: {
    width: 70 * vw,
    height: 6 * vh,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: primaryColor, // Use variable for consistency
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 20, // Increase bottom margin for spacing
    color: 'black'
  },
  texto: { 
    color: 'white',
    fontSize: 30,
    marginBottom: 20, // Space between the text and the input
  },
  buttonLogin: {
    width: 50 * vw,
    height: 6 * vh,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: primaryColor,
    backgroundColor: primaryColor, // Use variable for consistency
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Space before the hyperlink text
  },
  buttonLoginText: {
    color: 'white',
  },
  hyperlink: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100, // Push everything up a bit
  },
  hyperlinkText: {
    color: primaryColor,
  },
  containerImagem: {
    marginBottom: 40, // Reduce margin to push up the logo slightly
  },
});

