import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

export default function Input({
  label,
  inputStyle= styles.input,
  labelStyle = styles.label,
  onChangeText,
}){
  return (
    <View style={styles.container}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        style={inputStyle}
        onChangeText= {onChangeText}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 10,
    fontSize: 24,
    height: 40,
    color: '#fff',
    fontFamily: 'Inter_300Light'
  },
  label: {
    paddingVertical: 0,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Inter_600SemiBold'
  },
  error: {//TODO
    marginVertical: 5,
    paddingVertical: 0,
    fontSize: 14,
    color: '#F76C26',
    fontFamily: 'Inter_300Light'
  }
});
