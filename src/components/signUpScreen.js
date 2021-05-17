import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

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
      <TouchableOpacity onPress={() => signUp( email, password)}>
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
        <TouchableOpacity onPress={toggleIsNewUser}>
           <Text style = {[styles.buttonText]}>
               Sign in instead
           </Text>
        </TouchableOpacity >
        <StatusBar
          barStyle = "light-content"
          backgroundColor = '#000'/>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.welcomeText}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.welcomeText}
      />
    <TouchableOpacity onPress={() => signIn( email,password)}>
       <Text style = {[styles.buttonText]}>
           Log In
       </Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={toggleIsNewUser}>
         <Text style = {[styles.buttonText]}>
             Create An Account
         </Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={skip}>
         <Text style = {[styles.buttonText]}>
             DELETE ME
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
