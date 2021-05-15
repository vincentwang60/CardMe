import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

export default function homeScreen( {navigation }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const pressHandler = () => {
    navigation.navigate('informationScreen')
  }
  function signUp(gPassword, gEmail) {
    Auth.signUp({
      username: gEmail,
      password: gPassword
    })
    .then(()=>{
      console.log('successful signup!',email,password);
    })
    .catch(err=>console.log('error on signup!',err))
  }
  function confirmSignUp(gUsername, gConfirmationCode){
    Auth.confirmSignUp(gUsername, gConfirmationCode)
    .then(()=>{
      console.log('confirm success', email);
      navigation.navigate('informationScreen')
    })
    .catch(err=>console.log('confirm error!',err))
  }
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        placeholder="Set Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.welcomeText}
      />
      <TextInput
        label="Password"
        placeholder="Set Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.welcomeText}
      />
      <TouchableOpacity onPress={() => signUp( password, email)}>
       <Text style = {[styles.buttonText]}>
           Sign Up
       </Text>
      </TouchableOpacity >
      <TextInput
        label="Confirmation Code"
        placeholder="Enter Confirmation Code"
        value={confirmationCode}
        onChangeText={(text) => setConfirmationCode(text)}
        style={styles.welcomeText}
      />
    <TouchableOpacity onPress={() => confirmSignUp(email, confirmationCode)}>
           <Text style = {[styles.buttonText]}>
               Confirm
           </Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={pressHandler}>
         <Text style = {[styles.buttonText]}>
             Button
         </Text>
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
    flex: 1,
    backgroundColor: '#325F71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter_300Light',
    flex:0.08
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#AACCDA',
    fontSize: 20,
    color: 'black',
    fontFamily: 'Inter_600SemiBold',
  }
});
