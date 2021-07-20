import React from 'react';
import {View, Text, StyleSheet, Dimensions } from 'react-native';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

export default function Card1({
  data,
  labelStyle = styles.label,
  containerStyle,
}){
  var dataComponents = [] //array of the text components to display, created based on data
  for(var i = 0; i < data.content.length; i++){
    const newText =
      <Text style = {labelStyle} key = {i}>
        {data.content[i].data}
      </Text>
    dataComponents.push(newText)
  }
  return (
    <View style={containerStyle}>
      <View style={styles.container}>
         {dataComponents}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: Dimensions.get('window').width*.8,
    height: Dimensions.get('window').width*.4,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
  },
  label: {
    textAlign: 'center',
    paddingVertical: 1,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Nunito_400Regular',
    top: '20%',
  },
});
