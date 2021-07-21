import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default function Button({
  label,
  labelStyle = styles.label,
  containerStyle = styles.container,
  onPress,
  img,
  buttonStyle = styles.button,
  colors = ['#000','#000'],
}){
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={colors} style={containerStyle}>
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
         <Text style = {labelStyle}>
             {label}
         </Text>
      </TouchableOpacity >
      <View style={styles.imageContainer}>
        {img}
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  imageContainer:{
    top: '-75%',
    left: '3%',
  },
  container: {
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    width: Dimensions.get('window').width*.853,
  },
  label: {
    textAlign: 'center',
    paddingVertical: Dimensions.get('window').height*.012,
    paddingHorizontal: 0,
    fontSize: 15,
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
  },
});
