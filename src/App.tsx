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
import {Button, Image, TouchableOpacity} from "react-native";
import DispositivosComponent from "./pages/dispositivos";
import BuscaComponent from "./pages/busca";

const Stack = createNativeStackNavigator();

function irParaDispositivos(navigation: any) {
    navigation.replace('Dispositivos');
}

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
          name="Carrinho"
          component={CarrinhoComponent}
          options={(props) => ({
            title: 'Carrinho',
            headerRight: () => (
                <>
                    <Button title="Dispositivos" onPress={() => props.navigation.replace("Dispositivos")}/>
                    <TouchableOpacity onPress={() => props.navigation.replace("Busca")}>
                        <Image
                            source={require('./assets/busca.png')}
                            style={{
                                width: 40,
                                height: 40,
                                marginLeft: 30,
                            }}
                        />
                    </TouchableOpacity>
                </>
            ),
        })}
        />
        <Stack.Screen
          name="Dispositivos"
          component={DispositivosComponent}
          options={(props) => ({
            title: 'Dispositivos',
            headerRight: () => (
                <>
                    <Button title="Carrinho" onPress={() => props.navigation.replace("Carrinho")}/>
                    <TouchableOpacity onPress={() => props.navigation.replace("Busca")}>
                        <Image
                            source={require('./assets/busca.png')}
                            style={{
                                width: 40,
                                height: 40,
                                marginLeft: 30,
                            }}
                        />
                    </TouchableOpacity>
                </>
            ),
        })}
        />
        <Stack.Screen
          name="Busca"
          component={BuscaComponent}
          options={(props) => ({
            title: 'Buscar Produtos',
            headerRight: () => (
                <>
                    <TouchableOpacity onPress={() => props.navigation.replace("Carrinho")}>
                        <Image
                            source={require('./assets/x.png')}
                            style={{
                                width: 40,
                                height: 40,
                                marginLeft: 30,
                            }}
                            tintColor="red"
                        />
                    </TouchableOpacity>
                </>
            ),
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
