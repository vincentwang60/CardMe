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
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter_300Light',
  },
});
