import React from 'react';
import {View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Path } from "react-native-svg"

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Style1Bg from '../../assets/style1bg.js'
import Style2Bg from '../../assets/style2bg.js'
import Style3Bg from '../../assets/style3bg.js'

export default function Card1({
  data,
  labelStyle = styles.label,
  containerStyle,
}){
  var dataComponents = [] //array of the text components to display, created based on data
  let newText;
  newText =
    <Text style = {[labelStyle,{fontFamily:'Montserrat_500Medium',fontSize:20,top:'40%',}]} key = {0}>
      {data.content[0].data}
    </Text>
  dataComponents.push(newText)
  newText =
    <Text style = {[labelStyle,{fontSize:12,top:'65%'}]} key = {1}>
      {data.content[1].data}
    </Text>
  dataComponents.push(newText)
  newText =
    <Text style = {[labelStyle,{top:'75%'}]} key = {2}>
      {data.content[2].data}
    </Text>
  dataComponents.push(newText)
  let cardBg
  if(data.style == 1){
    cardBg = <Style1Bg style={styles.bg}/>
  }
  else if(data.style == 2){
    cardBg = <Style2Bg style={styles.bg}/>
  }
  else{
    cardBg = <Style3Bg style={styles.bg}/>
  }
  return (
    <View style={[containerStyle]}>
      {cardBg}
      <View style={styles.container}>
         {dataComponents}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bg:{
    position: 'absolute',
  },
  container: {
    marginVertical: 15,
    width: Dimensions.get('window').width*.8,
    height: Dimensions.get('window').width*.4,
    backgroundColor: 'transparent',
  },
  label: {
    position: 'absolute',
    left: '15%',
    paddingVertical: 1,
    fontSize: 10,
    color: 'white',
    fontFamily: 'Montserrat_300Light',
  },
});
