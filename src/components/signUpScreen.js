import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

import Input from './shared/input.js';
import Button from './shared/button.js';

export default function homeScreen( {navigation }) {
  const [isNewUser, setIsNewUser] = useState(true); //if isNewUser = true, show sign up. otherwise, show log-in screen
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  function toggleIsNewUser() {
    setIsNewUser(!isNewUser);
  }
  function signUp() {
    if(password==confirmPassword){
      Auth.signUp({
        username: email,
        password: password
      })
      .then(()=>{
        console.log('successful signup! still need to confirm',email);
        navigation.navigate('verificationScreen');
      })
      .catch(err=>console.log('error on signup!',err))
    }
    else{
      console.log('passwords dont match')
    }
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
        <Input containerStyle={[styles.input, { top: '29.0%'}]} label="Email" onChangeText={(text) => setEmail(text)} />
        <Input containerStyle={[styles.input, { top: '38.8%'}]} secure = {true} label="Password" onChangeText={(text) => setPassword(text)} />
        <Input containerStyle={[styles.input, { top: '48.4%'}]} secure = {true} label="Confirm Password" onChangeText={(text) => setConfirmPassword(text)} />
        <Button containerStyle={[styles.input, { top: '85.0%'}]} label="Next step" onPress={() => signUp()} />
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
  /*//code for confirmation code
    <Input containerStyle={[styles.input, { top: '5%'}]} label="Confirmation Code" onChangeText={(text) => setConfirmationCode(text)} />
    <Button containerStyle={[styles.input, { top: '0%'}]} label="CONFIRM" onPress={() => confirmSignUp(email, confirmationCode)} />
  */
  //<Button containerStyle={[styles.input, { top: '90.8%'}]} label="SIGN IN INSTEAD" onPress={toggleIsNewUser} />
  //IF RETURNING USER, SHOW LOG IN PAGE
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style={[styles.text, { top: '10.9%'}]}>Welcome back!</Text>
      <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>Sign in to continue. </Text>
      <Input containerStyle={[styles.input, { top: '56.5%'}]}label="Email" onChangeText={(text) => setEmail(text)} />
      <Input containerStyle={[styles.input, { top: '65.5%'}]} secure = {true} label="Password" onChangeText={(text) => setPassword(text)} />
      <Button containerStyle={[styles.input, { top: '81.5%'}]}label="Sign in" onPress={() => signIn( email, password)} />
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
    top: "73%",
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
