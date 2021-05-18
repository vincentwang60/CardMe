import React from 'react';
import {View, Text, StyleSheet, Dimensions } from 'react-native';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

export default function Card1({
  data,
  labelStyle = styles.label,
}){
  return (
    <View style={styles.container}>
         <Text style = {labelStyle}>
           Name: {data.name}{"\n"}Nickname: {data.nickname}
         </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: Dimensions.get('window').width-16,
    height: Dimensions.get('window').width/2,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
  },
  label: {
    textAlign: 'center',
    paddingVertical: 10,
    letterSpacing: 3,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Inter_300Light',
  },
});
