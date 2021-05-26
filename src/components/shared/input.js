import React from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';

export default function Input({
  label,
  inputStyle= styles.input,
  labelStyle = styles.label,
  containerStyle = styles.container,
  onChangeText,
  secure = false,
  error,
  icon,
}){

  if (icon) {
    return (
        <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          autoCapitalize="none"
          secureTextEntry = {secure}
          style={[inputStyle, {paddingHorizontal:50,}]}
          onChangeText= {onChangeText}
        />
        <View style={styles.icon}>{icon}</View>
        <Text style={styles.error}>{error && error.message}</Text>
      </View>
      );
  }
  else {
    return (
        <View style={containerStyle}>
          <Text style={labelStyle}>{label}</Text>
          <TextInput
            autoCapitalize="none"
            secureTextEntry = {secure}
            style={inputStyle}
            onChangeText= {onChangeText}
          />
          <Text style={styles.error}>{error && error.message}</Text>
        </View>
      );
  }
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
    width: Dimensions.get('window').width*.853,
    height: Dimensions.get('window').height*.037,
    color: '#000',
    borderBottomColor:'#8F8F8F',
    borderBottomWidth: 1,
    fontFamily: 'Nunito_700Bold',
    position: 'relative'
  },
  label: {
    paddingVertical: 0,
    fontSize: 14,
    color: '#8F8F8F',
    fontFamily: 'Inter_600SemiBold'
  },
  error: {//TODO
    marginVertical: 2,
    paddingVertical: 0,
    fontSize: 15,
    color: '#FF0000',
    fontFamily: 'Nunito_400Regular'
  },
   icon: {
   left:"90%",
    fontSize: 14,
    color: '#8F8F8F',
    fontFamily: 'Inter_600SemiBold',
    position: 'absolute',
    paddingVertical: 26,
  }
});
