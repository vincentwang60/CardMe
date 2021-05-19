import React from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';

export default function Input({
  label,
  inputStyle= styles.input,
  labelStyle = styles.label,
  containerStyle = styles.container,
  onChangeText,
  secure = false,
}){
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        secureTextEntry = {secure}
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
    paddingVertical: 5,
    paddingLeft: 2,
    fontSize: 14,
    width: Dimensions.get('window').width*.853,
    height: Dimensions.get('window').height*.037,
    color: '#000',
    borderBottomColor:'#8F8F8F',
    borderBottomWidth: 1,
    fontFamily: 'Nunito_700Bold',
  },
  label: {
    paddingVertical: 0,
    fontSize: 14,
    color: '#8F8F8F',
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
