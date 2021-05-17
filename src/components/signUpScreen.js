import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

import Input from './shared/input.js';
import Button from './shared/button.js';

export default function homeScreen( {navigation }) {
  const [isNewUser, setIsNewUser] = useState(false); //if isNewUser = true, show sign up. otherwise, show log-in screen
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const toggleIsNewUser = () => {
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
        <Input label="Email" onChangeText={(text) => setEmail(text)} />
        <Input label="Password" onChangeText={(text) => setPassword(text)} />
        <Button label="SIGN UP" onPress={() => signUp( email, password)} />
        <Input label="Confirmation Code" onChangeText={(text) => setConfirmationCode(text)} />
        <Button label="CONFIRM" onPress={() => confirmSignUp(email, confirmationCode)} />
        <Button label="SIGN IN INSTEAD" onPress={toggleIsNewUser} />
        <StatusBar
          barStyle = "light-content"
          backgroundColor = '#000'/>
      </View>
    );
  }
  //IF RETURNING USER, SHOW LOG IN PAGE
  return (
    <View style={styles.container}>
      <Input label="Email" onChangeText={(text) => setEmail(text)} />
      <Input label="Password" onChangeText={(text) => setPassword(text)} />
      <Button label="LOG IN" onPress={() => signIn( email, password)} />
      <Button label="CREATE AN ACCOUNT" onPress={toggleIsNewUser} />
      <TouchableOpacity onPress={skip}>
         <Text> DELETE ME  </Text>
      </TouchableOpacity >
      <StatusBar
        barStyle = "light-content"
        backgroundColor = '#000'/>
    </View>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#325F71',
    justifyContent: 'center',
    flex: 1,
    padding: 8,
  },
});
