import React from 'react';
import ItemCarrinho from "../../components/itemCarrinho";
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {vh, vw} from "../../services/Tamanhos.ts";

export default function Carrinho() {
    return (
      <ScrollView>
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
