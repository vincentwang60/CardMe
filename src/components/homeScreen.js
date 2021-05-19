import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Button from './shared/button.js'

export default function homeScreen( {navigation }) {
  const pressHandler = () => {
    navigation.navigate('libraryScreen')
  }
  return (
    <View style={styles.container}>
      <Text style = {[styles.welcomeText]}>Quick brown fox jumps over{"\n"}the lazy dog</Text>
      <Button label='Button' onPress = {pressHandler} />
      <StatusBar
        barStyle = "light-content"
        backgroundColor = '#000'/>
    </View>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#325F71',
    padding:8,
    justifyContent: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter_300Light',
  },
});
