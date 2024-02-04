import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
        .then(t => {
          if(t !== null) {
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
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
     {senhaVisivel && <TextInput
        style={styles.input}
        placeholder="Senha"
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80 * vh,
  },
  input: {
    width: 70 * vw,
    height: 6 * vh,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    margin: 5,
  },
  buttonLogin: {
    width: 50 * vw,
    height: 6 * vh,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    backgroundColor: '#5d5dfc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLoginText: {
    color: 'white',
  },
  hyperlink: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
  },
  hyperlinkText: {
    color: '#1b50de',
  },
});

