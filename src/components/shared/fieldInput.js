import React from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';

export default function FieldInput({
  label,
  inputStyle= styles.input,
  labelStyle = styles.label,
  containerStyle = styles.container,
  onChangeText,
  placeholder = 'asdf',
  secure = false,
  error,
  value
})
{
  return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          autoCapitalize="none"
          secureTextEntry = {secure}
          style={inputStyle}
          onChangeText= {onChangeText}
          value={value}
          placeholder={placeholder}
        />
        <Text style={styles.error}>{error && error.message}</Text>
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    backgroundColor: '#000'
  },
  input: {
    marginVertical: 2,
    paddingLeft: 2,
    fontSize: 14,
    width: Dimensions.get('window').width*.85,
    height: Dimensions.get('window').height*.037,
    color: '#000',
    borderBottomColor:'#8F8F8F',
    borderBottomWidth: 1,
    fontFamily: 'Nunito_400Regular',
    position: 'relative'
  },
  label: {
    paddingVertical: 0,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
  error: {
    marginVertical: 2,
    paddingVertical: 0,
    fontSize: 15,
    color: '#FF0000',
    fontFamily: 'Nunito_400Regular',
  },
});
