import React, { useState, useRef} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Platform, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

import Input from './shared/input.js';
import Button from './shared/button.js';

export default function logInScreen( {navigation }) {
  const { handleSubmit, watch, control } = useForm();
 

  function onSubmit(data) {
    console.log('Email is: ' + data.email)
    forgotPassword(data.email);
    navigation.navigate('verificationCodeForgotPassword', {email: data.email})
  };


  function forgotPassword(email){
    // Send confirmation code to user's email
    Auth.forgotPassword(email)
        .then(data => console.log(data))
        .catch(err => console.log(err));
        
  }
  function forgotPasswordSubmit(email, code, new_password){
    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(email, code, new_password)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}



  
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style={[styles.text, { top: '10.9%'}]}>Change Password Below</Text>
      <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>Please enter your email. </Text>
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
      <Button
        containerStyle={[styles.input, { top: '81.5%'}]}
        label="Send Confirmation Code"
        onPress={handleSubmit(onSubmit)}
      />
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
