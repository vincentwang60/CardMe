import React, { useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

import Input from './shared/input.js';
import Button from './shared/button.js';

export default function signUpScreen( {navigation }) {
  const { handleSubmit, watch, control, formState: {errors} } = useForm();
  const password = useRef({});
  password.current = watch("password","");

  function onSubmit(data) {
    console.log('data',data)
    signUp(data.email, data.password)
  };
  function toggleIsNewUser() {
    navigation.navigate('logInScreen')
  }
  function signUp(email, password) {
    console.log('sign up attempt with', email, password)
    Auth.signUp({
      username: email,
      password: password
    })
    .then(()=>{
      console.log('successful signup! still need to confirm',email);
      navigation.navigate('verificationScreen', {passedEmail: email, passedPassword: password});
    })
    .catch(err=>console.log('error on signup!',err))
  }
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style={[styles.text, { top: '10.9%'}]}>Create an account!</Text>
      <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>Register with your email.</Text>
      <Controller
        name='email'
        control={control}
        rules={{
          required: {value: true, message: 'Please enter an email'},
          pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Enter a valid e-mail address",}
        }}
        render={({field: {onChange, value }})=>(
          <Input
            error={errors.email}
            containerStyle={[styles.input, { top: '24.8%'}]}
            label="Email"
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        rules={{
          required: {value: true, message: 'Please enter a password'}
        }}
        render={({field: {onChange, value }})=>(
          <Input
            error={errors.password}
            containerStyle={[styles.input, { top: '34.8%'}]}
            secure = {true}
            label="Password"
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
      />
      <Controller
        name='confirm'
        control={control}
        rules={{
          validate: value => value === password.current || 'The passwords do not match'
        }}
        render={({field: {onChange, value }})=>(
          <Input
            error={errors.confirm}
            containerStyle={[styles.input, { top: '44.8%'}]}
            secure = {true}
            label="Confirm Password"
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )
      }/>
      <Button
        containerStyle={[styles.input, { top: '85.0%'}]}
        label="Next step"
        onPress={handleSubmit(onSubmit)}
      />
      <View style={[styles.textContainer, {top: "92.5%"}]}>
        <Text style={[styles.signUpText]}>Already have an account? </Text>
        <TouchableOpacity onPress={toggleIsNewUser}>
          <Text style={[styles.signUpText, {fontFamily: 'Nunito_700Bold'}]}> Sign in! </Text>
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
  textContainer:{
    position: 'absolute',
    justifyContent: 'center',
    width: "100%",
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
  signUpText:{
    alignItems: 'center',
    fontFamily: 'Nunito_400Regular',
    fontSize: 13,
  },
});
