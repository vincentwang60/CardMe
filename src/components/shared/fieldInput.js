import React from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';

export default function FieldInput({
  label,
  inputStyle= styles.input,
  labelStyle = styles.label,
  containerStyle = styles.container,
  onChangeText,
  secure = false,
  error,
  value
})
{
  return (
      <View style={containerStyle}>
        <View style={styles.fieldStyle}>
          <Text style={labelStyle}>{label}</Text>
          <TextInput
            autoCapitalize="none"
            secureTextEntry = {secure}
            style={inputStyle}
            onChangeText= {onChangeText}
            value={value}
          />
          <Text style={styles.error}>{error && error.message}</Text>
        </View>
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    backgroundColor: '#000'
  },
  input: {
    paddingVertical: 5,
    paddingLeft: 2,
    fontSize: 14,
    width: Dimensions.get('window').width*.41,
    height: Dimensions.get('window').height*.037,
    color: '#000',
    borderBottomColor:'#8F8F8F',
    borderBottomWidth: 1,
    fontFamily: 'Nunito_400Regular',
    position: 'relative'
  },
  label: {
    paddingVertical: 0,
    fontSize: 14,
    color: '#8F8F8F',
    fontFamily: 'Nunito_400Regular',
  },
  error: {
    marginVertical: 2,
    paddingVertical: 0,
    fontSize: 15,
    color: '#FF0000',
    fontFamily: 'Nunito_400Regular',
  },
  fieldStyle: {
    paddingHorizontal: 5,
  },
   icon: {
   left:"90%",
    fontSize: 14,
    color: '#8F8F8F',
    fontFamily: 'Nunito_400Regular',
    position: 'absolute',
    paddingVertical: 26,
  }
});
