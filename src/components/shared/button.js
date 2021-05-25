import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions, Image} from 'react-native';

export default function Button({
  label,
  labelStyle = styles.label,
  containerStyle = styles.container,
  onPress,
  img,
}){
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
         <Text style = {labelStyle}>
             {label}
         </Text>
      </TouchableOpacity >
      <View style={styles.imageContainer}>
        {img}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer:{
    top: '-75%',
    left: '3%',
  },
  container: {
    marginVertical: 5,
  },
  button: {
    width: Dimensions.get('window').width*.853,
  },
  label: {
    textAlign: 'center',
    borderRadius: 10,
    paddingVertical: Dimensions.get('window').height*.012,
    paddingHorizontal: 0,
    backgroundColor: '#000',
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
  },
});
