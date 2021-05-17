import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'

export default function Input({
  label,
  placeholder,
  inputStyle= styles.input,
  onChangeText,
}){
  return (
    <TextInput
      label = {label}
      placeholder= {placeholder}
      style={inputStyle}
      onChangeText= {onChangeText}
    />
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputStyle: PropTypes.any,
  onChangeText: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter_300Light',
  }
});
