/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginComponent from './pages/login';
import CarrinhoComponent from "./pages/carrinho";
import {Button, Image, Text, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdicionarDispositivo from "./pages/configurar-dispositivo";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={LoginComponent}
                    options={{title: 'Carrinho Inteligente'}}
                />
                <Stack.Screen
                    name="AdicionarDispositivo"
                    component={AdicionarDispositivo}
                    options={{title: 'Configurar Dispositivo'}}
                />
                <Stack.Screen
                    name="Carrinho"
                    component={CarrinhoComponent}
                    options={(props) => ({
                        title: 'Carrinho',
                        headerRight: () => (
                            <>
                                <Button title="Dispositivo " onPress={() => props.navigation.navigate("AdicionarDispositivo")}/>
                                <Text>{'  '}</Text>
                                <Button title="Sair"
                                        onPress={() => AsyncStorage.removeItem("token").then(() => props.navigation.replace("Home"))}/>
                            </>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
