import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';

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
  function signUp(gEmail, gPassword) {
    Auth.signUp({
      username: gEmail,
      password: gPassword
    })
    .then(()=>{
      console.log('successful signup!',email);
    })
    .catch(err=>console.log('error on signup!',err))
  }
  function skip(gEmail, gPassword) {
    navigation.navigate('informationScreen')
  }
  function confirmSignUp(gUsername, gConfirmationCode){
    Auth.confirmSignUp(gUsername, gConfirmationCode)
    .then(()=>{
      console.log('confirm success', email);
      navigation.navigate('informationScreen')
    })
    .catch(err=>console.log('confirm error!',err))
  }
  function signIn (gEmail, gPassword){
    const user = Auth.signIn(gEmail, gPassword)
    .then(()=>{
      console.log('successful login!');
      navigation.navigate('informationScreen')
    })
    .catch(err=>console.log('error on login!',err))
  }

  if (isNewUser){
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { top: '10.9%'}]}>Create an account!</Text>
        <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>Register with your email.</Text>
        <Input containerStyle={[styles.input, { top: '29.0%'}]} label="Email" onChangeText={(text) => setEmail(text)} />
        <Input containerStyle={[styles.input, { top: '38.8%'}]} label="Password" onChangeText={(text) => setPassword(text)} />
        <Input containerStyle={[styles.input, { top: '48.4%'}]} label="Confirm Password" onChangeText={(text) => setConfirmPassword(text)} />
        <Button containerStyle={[styles.input, { top: '85.0%'}]} label="Next stsdfsdfep!" onPress={() => signUp( email, password)} />
        <View style={styles.textContainer}>
          <Text style={[styles.signInText]}>Already have an account? </Text>
          <TouchableOpacity onPress={toggleIsNewUser}>
            <Text style={[styles.signInText, {fontFamily: 'Nunito_700Bold'}]}> Sign in! </Text>
          </TouchableOpacity>
        </View>
        <StatusBar
          barStyle = 'dark-content'
          backgroundColor = '#fff'/>
      </View>
    );
  }
  /*//code for confirmation code
    <Input containerStyle={[styles.input, { top: '5%'}]} label="Confirmation Code" onChangeText={(text) => setConfirmationCode(text)} />
    <Button containerStyle={[styles.input, { top: '0%'}]} label="CONFIRM" onPress={() => confirmSignUp(email, confirmationCode)} />
  */
  //<Button containerStyle={[styles.input, { top: '90.8%'}]} label="SIGN IN INSTEAD" onPress={toggleIsNewUser} />
  //IF RETURNING USER, SHOW LOG IN PAGE
  return (
    <View style={styles.container}>
      <Input label="Email" onChangeText={(text) => setEmail(text)} />
      <Input label="Password" onChangeText={(text) => setPassword(text)} />
      <Button label="LOG IN" onPress={() => signIn( email, password)} />
      <Button label="CREATE AN ACCOUNT" onPress={toggleIsNewUser} />
      <Button label="SKIP DELETE ME" onPress={skip} />
      <StatusBar
        barStyle = "light-content"
        backgroundColor = '#fff'/>
    </View>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  textContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    top: "84.5%",
  },
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex: 1,
    padding: '2%',
  },
  text:{
    fontSize: 20,
    left:"7.2%",
    position: 'absolute',
    fontFamily: 'Nunito_700Bold',
  },
  input:{
    position: 'absolute',
    left: "7.2%",
  },
  signInText:{
    fontFamily: 'Nunito_400Regular',
    fontSize: 13,
  },
});
