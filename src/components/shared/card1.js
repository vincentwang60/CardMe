import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Rect, Path } from "react-native-svg"
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

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
  var iconComponents = []
  const blacklist = ['displayName','heading','subHeading','phone','email','website']
  for(let i = 0; i < data.content.length; i++){
    if(!blacklist.includes(data.content[i].name)){
      console.log('creating icon:',data.content[i].name)
      let icon
      switch(data.content[i].name){
        case 'linkedin':
          icon = <AntDesign style={{width:'10%'}} key = {i} name="linkedin-square" size={24} color="white" />
          break;
        case 'instagram':
          icon = <AntDesign style={{width:'10%'}} key = {i} name="instagram" size={24} color="white" />
          break;
        case 'twitter':
          icon = <AntDesign style={{width:'10%'}} key = {i} name="twitter" size={24} color="white" />
          break;
        case 'facebook':
          icon = <EvilIcons style={{width:'10%',left:'-15%'}} key = {i}  name="sc-facebook" size={30} color="white" />
          break;
        case 'whatsapp':
          icon = <FontAwesome style={{width:'10%'}} key = {i} name="whatsapp" size={24} color="white" />
          break;
        case 'snapchat':
          icon = <FontAwesome style={{width:'10%'}} key = {i} name="snapchat-square" size={24} color="white" />
          break;
        case 'wechat':
          icon = <AntDesign style={{width:'10%'}} key = {i} name="wechat" size={24} color="white" />
          break;

      }
      iconComponents.push(icon)
    }
  }
  console.log('finished icon components length:', iconComponents.length)
  var backText = []
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
      let email, phone, website
      for(let i = 3; i < data.content.length;i++){
        if (data.content[i].name == 'email'){
          email = <Text style = {[labelStyle,{left:'0%'}]} key = {1}>{data.content[i].data}</Text>
        }
        if (data.content[i].name == 'phone'){
          phone = <Text style = {[labelStyle,{left:'0%'}]} key = {2}>{data.content[i].data}</Text>
        }
        if (data.content[i].name == 'website'){
          website = <Text style = {[labelStyle,{left:'0%'}]} key = {3}>{data.content[i].data}</Text>
        }
      }
      if(email != null){
        backText.push(email)
      }
      if(website != null){
        backText.push(website)
      }
      if(phone != null){
        backText.push(phone)
      }
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
      <View style={[containerStyle,{alignItems: 'center'}]}>
        {cardBg}
        <View style={[styles.container,{}]}>
           {dataComponents}
        </View>
      </View>
    );
  }
  else if (showFront){
    return (
      <TouchableOpacity style = {[styles.touchable, {}]} onPress = {()=>{setShowFront(false)}}>
        <View style={[containerStyle,{alignItems: 'center'}]}>
          {cardBg}
          <View style={[styles.container,{}]}>
             {dataComponents}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  else{
    return (
      <TouchableOpacity style = {styles.touchable} onPress = {()=>{setShowFront(true)}}>
        <View style={[containerStyle,{alignItems: 'center'}]}>
          {cardBg}
          <View style={[styles.container,{position: 'relative',alignItems: 'center'}]}>
            <Text style = {styles.titleStyle} key = {0}>
              {data.content[0].data}
            </Text>
            <View style = {{top:'30%',alignItems:'center'}}>
              {backText}
            </View>
            <View style = {{top:'20%',flexDirection:'row'}}>
              {iconComponents}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  titleStyle:{
    color:'#F4DCD6',
    borderBottomWidth: 1,
    fontFamily:'Montserrat_500Medium',
    fontSize:15,
    top:'20%',
    paddingBottom: '1%',
    borderBottomColor: '#F4DCD6',
  },
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
    left:'5%',
    fontSize: 10,
    color: 'white',
    fontFamily: 'Montserrat_300Light',
  },
});
