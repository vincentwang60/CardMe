import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Rect, Path } from "react-native-svg"

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Style1Bg from '../../assets/style1bg.js'
import Style2Bg from '../../assets/style2bg.js'
import Style3Bg from '../../assets/style3bg.js'

export default function Card1({
  data,
  labelStyle = styles.label,
  containerStyle,
  focused = false,
}){
  const [showFront, setShowFront] = useState(true)
  var dataComponents = [] //array of the text components to display, created based on data
  var layoutStyle = styles.layout1
  var style = data.style
  let newText;
  if(data != null){
    if(data.content != null){
      newText =
        <Text style = {[labelStyle,{fontFamily:'Montserrat_500Medium',fontSize:20,top:'40%',}]} key = {0}>
          {data.content[0].data}
        </Text>
      dataComponents.push(newText)
      newText =
        <Text style = {[labelStyle,{fontSize:12,top:'50%'}]} key = {1}>
          {data.content[1].data}
        </Text>
      dataComponents.push(newText)
      newText =
        <Text style = {[labelStyle,{top:'50%'}]} key = {2}>
          {data.content[2].data}
        </Text>
      dataComponents.push(newText)
    }
  }
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
  if(!focused){
    return (
      <View style={[containerStyle]}>
        {cardBg}
        <View style={styles.container}>
           {dataComponents}
        </View>
      </View>
    );
  }
  else if (showFront){
    return (
      <TouchableOpacity style = {styles.touchable} onPress = {()=>{setShowFront(false)}}>
        <View style={[containerStyle]}>
          {cardBg}
          <View style={styles.container}>
             {dataComponents}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  else{
    return (
      <TouchableOpacity style = {styles.touchable} onPress = {()=>{setShowFront(true)}}>
        <View style={[containerStyle]}>
          {cardBg}
          <View style={styles.container}>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
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
  touchable:{
  },
  label: {
    left: '15%',
    fontSize: 10,
    color: 'white',
    fontFamily: 'Montserrat_300Light',
  },
});
