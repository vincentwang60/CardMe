import React, { useState, useRef} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

import Input from './shared/input.js';
import Button from './shared/button.js';

export default function logInScreen( {navigation }) {
  const [methodChosen, setMethodChosen] = useState(false);
  const { handleSubmit, watch, control } = useForm();

  function onSubmit(data) {
    signIn(data.email,data.password)
  };
  function forgotPassword(){
    console.log('TODO')
  }
  function toggleIsNewUser() {
    navigation.navigate('signUpScreen')
  }
  function appleIdLogin(){
    console.log('apple login TODO')
  }
  function facebookLogin(){
    console.log('facebook login TODO')
  }
  function googleLogin(){
    console.log('google login TODO')
  }
  function signIn (email, password){
    const user = Auth.signIn(email, password)
    .then(()=>{
      console.log('successfully logged in as!', email);
      navigation.navigate('informationScreen', {email: email})
    })
    .catch(err=>console.log('error on login!',err))
  }

  if(!methodChosen){
    return (
      <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
        <Text style={[styles.text, { top: '10.9%'}]}>Welcome back!</Text>
        <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>Sign in to continue. </Text>
        <View style={[styles.textContainer, {top: '90.0%'}]}>
          <TouchableOpacity onPress={toggleIsNewUser}>
            <Text style={[styles.signInText, {fontFamily: 'Nunito_700Bold'}]}> Create an account! </Text>
          </TouchableOpacity>
        </View>
        <Button
          containerStyle={[styles.input, { top: '61%'}]}
          label='Use email'
          onPress={() => {setMethodChosen(!methodChosen)}}
        />
        <Button
          containerStyle={[styles.input, { top: '68%'}]}
          label='Use Apple ID'
          onPress={appleIdLogin}
        />
        <Button
          containerStyle={[styles.input, { top: '75%'}]}
          label='Use Facebook'
          onPress={facebookLogin}
        />
        <Button
          containerStyle={[styles.input, { top: '82%'}]}
          label='Use Google'
          onPress={googleLogin}
        />
        <StatusBar
          barStyle = 'dark-content'
          backgroundColor = '#fff'/>
      </LinearGradient>
    )
  }
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style={[styles.text, { top: '10.9%'}]}>Welcome back!</Text>
      <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>Sign in to continue. </Text>
      <Controller
        name='email'
        control={control}
        render={({field: {onChange, value }})=>(
          <Input
            containerStyle={[styles.input, { top: '34.8%'}]}
            label="Email"
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({field: {onChange, value }})=>(
          <Input
            containerStyle={[styles.input, { top: '44.8%'}]}
            secure = {true}
            label="Password"
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
      />
      <Button
        containerStyle={[styles.input, { top: '81.5%'}]}
        label="Sign in"
        onPress={handleSubmit(onSubmit)}
      />
      <TouchableOpacity onPress={forgotPassword} style={[styles.touchable, {top: '52.5%'}]}>
        <Text style={[styles.signInText, {fontFamily: 'Nunito_700Bold'}]}> Forgot your password? </Text>
      </TouchableOpacity>
      <View style={[styles.textContainer, {top: '90.0%'}]}>
        <TouchableOpacity onPress={toggleIsNewUser}>
          <Text style={[styles.signInText, {fontFamily: 'Nunito_700Bold'}]}> Create an account! </Text>
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
  touchable:{
    position: 'absolute',
    left: "6.2%",
  },
  textContainer:{
    position: 'absolute',
    justifyContent: 'center',
    width: "100%",
    top: "92.5%",
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex: 1,
  },
  text:{
    fontSize: 20,
    left:"6.2%",
    position: 'absolute',
    fontFamily: 'Nunito_700Bold',
  },
  input:{
    position: 'absolute',
    left: "6.2%",
  },
  signInText:{
    alignItems: 'center',
    fontFamily: 'Nunito_400Regular',
    fontSize: 13,
  },
});
