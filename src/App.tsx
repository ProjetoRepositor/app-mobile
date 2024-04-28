/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginComponent from './pages/login';
import CarrinhoComponent from "./pages/carrinho";
import { Button, Image, Text, TouchableOpacity, StyleSheet,View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdicionarDispositivo from "./pages/configurar-dispositivo";


const azulClaro='#72C7FF';
const azulEscuro='#0A2240';

const Stack = createNativeStackNavigator();

const HeaderTitle = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('./assets/Logo.jpeg')} // Substitua pelo caminho correto da sua imagem
        style={{ width: 50, height: 30, marginRight: 10 }} // Ajuste o tamanho conforme necessário
      />
      <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 26 }}>CartNinja</Text>
    </View>
  );

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: azulEscuro, // Azul claro da sua paleta de cores
                },
                headerTintColor: '#FF6A13', // Cor dos botões e título no cabeçalho
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                <Stack.Screen
                    name="Home"
                    component={LoginComponent}
                    options={{ title: 'CartNinja' }}
                />
                <Stack.Screen
                    name="AdicionarDispositivo"
                    component={AdicionarDispositivo}
                    options={{ title: 'Configurar Dispositivo' }}
                />
               <Stack.Screen
                    name="Carrinho"
                    component={CarrinhoComponent}
                    options={(props) => ({
                        headerTitle: () => <HeaderTitle />,
                        headerRight: () => (
                            <>
                                <TouchableOpacity onPress={() => props.navigation.navigate("AdicionarDispositivo")} style={styles.headerButton}>
                                    <Text style={styles.headerButtonText}>Dispositivo</Text>
                                </TouchableOpacity>
                                <Text>{'  '}</Text>
                                <TouchableOpacity onPress={() => AsyncStorage.removeItem("token").then(() => props.navigation.replace("Home"))} style={styles.headerButton}>
                                    <Text style={styles.headerButtonText}>Sair</Text>
                                </TouchableOpacity>
                            </>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


// E adicione os seguintes estilos ao seu StyleSheet:
const styles = StyleSheet.create({
    headerButton: {
        padding: 10,
        backgroundColor: '#FF6A13', // A cor laranja do seu logo
        borderRadius: 5,
        marginRight: 5, // Se precisar de espaçamento entre os botões
    },
    headerButtonText: {
        color: '#FFFFFF', // Texto branco para melhor contraste
        fontWeight: 'bold',
    },
    // ... outros estilos que você já tem
});


export default App;
