import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

import Button from './shared/button.js';

export default function homeScreen( {navigation }) {
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  function toggleIsNewUser() {
    setIsNewUser(!isNewUser);
  }
  function confirmSignUp(gUsername, gConfirmationCode){
    Auth.confirmSignUp(gUsername, gConfirmationCode)
    .then(()=>{
      console.log('confirm success', email);
      navigation.navigate('informationScreen')
    })
    .catch(err=>console.log('confirm error!',err))
  }
  function resendCode(){
    console.log('you thought')
  }
  function signIn (gEmail, gPassword){
    console.log('test', gEmail, gPassword)
    const user = Auth.signIn(gEmail, gPassword)
    .then(()=>{
      console.log('successful login!');
      navigation.navigate('informationScreen')
    })
    .catch(err=>console.log('error on login!',err))
  }
  //<Input containerStyle={[styles.input, { top: '56.5%'}]}label="Email" onChangeText={(text) => setEmail(text)} />
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style={[styles.text, { top: '10.9%'}]}>Authenticate your account!</Text>
      <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>We sent a verification code to{'\n'}your email address. </Text>
      <Text style={styles.labelStyle}> Verfication code </Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput}
          autoFocus = {true}
          autoCapitalize = {"characters"}
          onKeyPress={({ nativeEvent }) => {
            if(nativeEvent.key != 'Backspace') {ref_input2.current.focus()}
          }}
          maxLength={1}
          ref={ref_input1}
        />
        <TextInput style={styles.textInput}
          autoCapitalize = {"characters"}
          onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ? ref_input1.current.focus() : ref_input3.current.focus()
          }}
          maxLength={1}
          ref={ref_input2}
        />
        <TextInput style={styles.textInput}
          autoCapitalize = {"characters"}
          onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ? ref_input2.current.focus() : ref_input4.current.focus()
          }}
          maxLength={1}
          ref={ref_input3}
        />
        <TextInput style={styles.textInput}
          autoCapitalize = {"characters"}
          onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ? ref_input3.current.focus() : ref_input5.current.focus()
          }}
          maxLength={1}
          ref={ref_input4}
        />
        <TextInput style={styles.textInput}
          autoCapitalize = {"characters"}
          onKeyPress={({ nativeEvent }) => {
            nativeEvent.key === 'Backspace' ? ref_input4.current.focus() : ref_input6.current.focus()
          }}
          maxLength={1}
          ref={ref_input5}
        />
        <TextInput style={styles.textInput}
          autoCapitalize = {"characters"}
          onKeyPress={({ nativeEvent }) => {
            if(nativeEvent.key === 'Backspace'){ ref_input5.current.focus() }
          }}
          maxLength={1}
          ref={ref_input6}
        />
      </View>
      <Button containerStyle={[styles.textContainer, { top: '81.5%'}]} label="Authenticate account" onPress={() => signIn( email, password)} />
      <View style={styles.textContainer}>
        <Text style={[styles.signInText]}>Haven't received it? </Text>
        <TouchableOpacity onPress={resendCode}>
          <Text style={[styles.signInText, {fontFamily: 'Nunito_700Bold'}]}> Resend code! </Text>
        </TouchableOpacity>
      </View>
      <StatusBar
        barStyle = 'dark-content'
        backgroundColor = '#fff'/>
    </LinearGradient>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  labelStyle:{
    position: 'absolute',
    left: "6.2%",
    top: "28%",
    color: '#8F8F8F',
    fontSize:15,
    fontFamily: 'Nunito_700Bold',
  },
  inputContainer:{
    position: 'absolute',
    left: "6.2%",
    width: "85.3%",
    top: "33.5%",
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  textContainer:{
    position: 'absolute',
    justifyContent: 'center',
    width: "100%",
    top: "90.5%",
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex: 1,
  },
  textInput:{
    fontSize: 30,
    textAlign: 'center',
    width: 30,
    borderBottomColor: '#8F8F8F',
    borderBottomWidth: 1,
    fontFamily: 'Nunito_700Bold',
  },
  text:{
    fontSize: 20,
    left:"6.2%",
    position: 'absolute',
    fontFamily: 'Nunito_700Bold',
  },
  signInText:{
    alignItems: 'center',
    fontFamily: 'Nunito_400Regular',
    fontSize: 13,
  },
});
