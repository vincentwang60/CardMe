import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

import Input from './shared/input.js';
import Button from './shared/button.js';

export default function homeScreen( {navigation }) {
  const [isNewUser, setIsNewUser] = useState(true); //if isNewUser = true, show sign up. otherwise, show log-in screen
  const { handleSubmit, watch, control, formState: {errors} } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch("newPassword","");

  function onSubmit(data) {
    if(isNewUser){
      if(data.newPassword == data.confirm){
        signUp(data.newEmail, data.newPassword)
      }
    }
    else{
      signIn(data.email,data.password)
    }
  };
  function toggleIsNewUser() {
    setIsNewUser(!isNewUser);
  }
  function signUp(email, password) {
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
  function skip(gEmail, gPassword) {
    navigation.navigate('informationScreen')
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

  if (isNewUser){
    return (
      <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
        <Text style={[styles.text, { top: '10.9%'}]}>Create an account!</Text>
        <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>Register with your email.</Text>
        <Controller
          name='newEmail'
          control={control}
          rules={{
            required: {value: true, message: 'Please enter an email'},
            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Enter a valid e-mail address",}
          }}
          render={({field: {onChange, value }})=>(
            <Input error={errors.newEmail} containerStyle={[styles.input, { top: '24.8%'}]} label="Email" onChangeText={(text) => onChange(text)} value={value}/>
          )
        }/>
        <Controller
          name='newPassword'
          control={control}
          rules={{
            required: {value: true, message: 'Please enter a password'}
          }}
          render={({field: {onChange, value }})=>(
            <Input error={errors.newPassword} containerStyle={[styles.input, { top: '34.8%'}]} secure = {true} label="Password" onChangeText={(text) => onChange(text)} value={value} />
          )
        }/>
        <Controller
          name='confirm'
          control={control}
          rules={{
            validate: value => value === newPassword.current || 'The passwords do not match'
          }}
          render={({field: {onChange, value }})=>(
            <Input error={errors.confirm} containerStyle={[styles.input, { top: '44.8%'}]} secure = {true} label="Confirm Password" onChangeText={(text) => onChange(text)} value={value}/>
          )
        }/>
      <Button containerStyle={[styles.input, { top: '85.0%'}]} label="Next step" onPress={handleSubmit(onSubmit)} />
        <View style={styles.textContainer}>
          <Text style={[styles.signInText]}>Already have an account? </Text>
          <TouchableOpacity onPress={toggleIsNewUser}>
            <Text style={[styles.signInText, {fontFamily: 'Nunito_700Bold'}]}> Sign in! </Text>
          </TouchableOpacity>
        </View>
        <StatusBar
          barStyle = 'dark-content'
          backgroundColor = '#fff'/>
      </LinearGradient>
    );
  }

  //IF RETURNING USER, SHOW LOG IN PAGE
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style={[styles.text, { top: '10.9%'}]}>Welcome back!</Text>
      <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>Sign in to continue. </Text>
      <Controller
        name='email'
        control={control}
        render={({field: {onChange, value }})=>(
          <Input containerStyle={[styles.input, { top: '34.8%'}]} label="Email" onChangeText={(text) => onChange(text)} value={value}/>
        )
      }/>
      <Controller
        name='password'
        control={control}
        render={({field: {onChange, value }})=>(
          <Input containerStyle={[styles.input, { top: '44.8%'}]} secure = {true} label="Password" onChangeText={(text) => onChange(text)} value={value} />
        )
      }/>
      <Button containerStyle={[styles.input, { top: '81.5%'}]}label="Sign in" onPress={handleSubmit(onSubmit)} />
      <TouchableOpacity onPress={toggleIsNewUser} style={[styles.touchable]}>
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
    top: "52.5%",
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
