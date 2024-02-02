import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {vh, vw} from '../../services/Tamanhos.ts';

function login(navigation: any) {
  navigation.replace('Carrinho');
}

export default function Login(props: any) {
  const [senhaVisivel, setSenhaVisivel] = React.useState(false);

  const [email, setEmail] = React.useState("");

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

      fetch("https://uiuqq28cu9.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/autenticacao/conta/solicitar", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
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
    />}
      <TouchableOpacity style={styles.buttonLogin} onPress={() => {
        // login(props.navigation);
        if (!senhaVisivel) {
          solicitarSenha(email);
          // setSenhaVisivel(true);
        }
        // Alert.alert("Login", "Corpo");
      }}>
        <Text style={styles.buttonLoginText}>Login</Text>
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
