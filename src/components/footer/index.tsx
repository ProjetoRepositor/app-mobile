import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width; // Obtém a largura da tela


const Footer = () => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>v1.2</Text>
  </View>
);

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth, // Define a largura para igual à da tela
    backgroundColor: '#0A2240', 
    padding: 10,
  },
  footerText: {
    fontSize: 16,
    color:'white',
  },
});

export default Footer;
