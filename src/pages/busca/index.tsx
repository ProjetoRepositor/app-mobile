import React from 'react';
import ItemCarrinho from "../../components/itemCarrinho";
import {Button, ScrollView, StyleSheet, TextInput, View} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";

export default function Busca() {
    return (
        <ScrollView>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Creme de Leite Piracanjuba"
                    autoCapitalize="none"
                />
                <Button title="Buscar" />
            </View>
            <ItemCarrinho
                imageUrl="https://superpao.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fsuperpao.vtexassets.com%2Farquivos%2Fids%2F366406%2FCreme-De-Leite-Leve-Uht-Homogeneizado-Piracanjuba-Caixa-200G.jpg%3Fv%3D638376717684430000"
                title="Creme de Leite Piracanjuba 200g"
                qtd={5}
            />
            <ItemCarrinho
                imageUrl="https://superpao.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fsuperpao.vtexassets.com%2Farquivos%2Fids%2F366406%2FCreme-De-Leite-Leve-Uht-Homogeneizado-Piracanjuba-Caixa-200G.jpg%3Fv%3D638376717684430000"
                title="Creme de Leite Piracanjuba 200g"
                qtd={5}
            />
            <ItemCarrinho
                imageUrl="https://superpao.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fsuperpao.vtexassets.com%2Farquivos%2Fids%2F366406%2FCreme-De-Leite-Leve-Uht-Homogeneizado-Piracanjuba-Caixa-200G.jpg%3Fv%3D638376717684430000"
                title="Creme de Leite Piracanjuba 200g"
                qtd={5}
            />
            <ItemCarrinho
                imageUrl="https://superpao.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fsuperpao.vtexassets.com%2Farquivos%2Fids%2F366406%2FCreme-De-Leite-Leve-Uht-Homogeneizado-Piracanjuba-Caixa-200G.jpg%3Fv%3D638376717684430000"
                title="Creme de Leite Piracanjuba 200g"
                qtd={5}
            />
            <ItemCarrinho
                imageUrl="https://superpao.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fsuperpao.vtexassets.com%2Farquivos%2Fids%2F366406%2FCreme-De-Leite-Leve-Uht-Homogeneizado-Piracanjuba-Caixa-200G.jpg%3Fv%3D638376717684430000"
                title="Creme de Leite Piracanjuba 200g"
                qtd={5}
            />
        </ScrollView>
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
    searchContainer: {
        alignItems: 'center',
        width: 100 * vw,
        flexDirection: 'row'
    },
})
