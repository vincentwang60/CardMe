import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'

export default function Button({
  label,
  labelStyle = styles.label,
  onPress,
}){
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
         <Text style = {labelStyle}>
             {label}
         </Text>
      </TouchableOpacity >
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 0,
    borderWidth: 2,
    borderColor: 'black',
    letterSpacing: 3,
    backgroundColor: '#AACCDA',
    fontSize: 20,
    color: 'black',
    fontFamily: 'Inter_600SemiBold',
  },
});
