import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>v1.1</Text>
  </View>
);

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
  footerText: {
    fontSize: 16,
    color:'black',
  },
});

export default Footer;
