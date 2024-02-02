import React from 'react';
import ItemCarrinho from "../../components/itemCarrinho";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";

export default function Carrinho(props: any) {
    return (
      <ScrollView>
          <ItemCarrinho />
          <ItemCarrinho />
          <ItemCarrinho />
          <ItemCarrinho />
          <ItemCarrinho />
          <ItemCarrinho />
          <ItemCarrinho />
          <ItemCarrinho />
          <ItemCarrinho />
          <TouchableOpacity style={styles.finalizarCompra}>
              <Text>
                  Finalizar Compra
              </Text>
          </TouchableOpacity>
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
})