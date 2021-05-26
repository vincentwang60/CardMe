import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
Amplify.configure(AWSConfig)

import Button from './shared/button.js';

export default function verificationScreen( {route, navigation }) {
  const {passedEmail} = route.params;
  const {passedPassword} = route.params;
  const [confirmationCode, setConfirmationCode] = useState('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const codeDigitsArray = new Array(6).fill(0)
  const ref = useRef();
  const [spamTimeout, setSpamTimeout] = useState(false);

  function handleOnPress() {
    setContainerIsFocused(true);
    console.log('pressed', containerIsFocused)
    ref.current.focus();
  }
  const toDigitInput = (_value: number, i: number) =>{
    const emptyInputchar = '  '
    const digit = confirmationCode[i] || emptyInputchar

    const isCurrentDigit = i === confirmationCode.length;
    const isLastDigit = i === 5;
    const isCodeFull = confirmationCode.length === 6;
    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const inputStyle = containerIsFocused && isFocused
        ? {...styles.inputContainer, ...styles.inputContainerFocused}
        : styles.inputContainer;

    return(
      <View style={inputStyle} key={i}>
        <Text style = {styles.inputText}>{digit}</Text>
      </View>
    );
  }
  function toggleIsNewUser() {
    setIsNewUser(!isNewUser);
  }
  function confirmSignUp(){
    Auth.confirmSignUp(passedEmail, confirmationCode)
    .then(()=>{
      console.log('confirm success', passedEmail);
      signIn()
    })
    .catch(err=>console.log('confirm error!',err))
  }
  async function resendConfirmationCode() {
    try {
        //await Auth.resendSignUp(passedEmail);
        console.log('code resent successfully');

    } catch (err) {
        console.log('error resending code: ', err);
    }
}
  function signIn (){
    console.log('signing in as', passedEmail)
    const user = Auth.signIn(passedEmail, passedPassword)
    .then(()=>{
      console.log('successful login!');
      navigation.navigate('editScreen', {email: passedEmail})
    })
    .catch(err=>console.log('error on login!',err))
  }
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style={[styles.text, { top: '10.9%'}]}>Authenticate your account!</Text>
      <Text style={[styles.text, { top: '15.2%'}, {color: '#8F8F8F'}]}>We sent a verification code to{'\n'}your email address. </Text>
      <Text style={styles.labelStyle}> Verification code </Text>
      <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref = {ref}
        value={confirmationCode}
        onChangeText={setConfirmationCode}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={6}
        style={styles.hiddenCodeInput}
      />
      <Button containerStyle={[styles.textContainer, { top: '81.5%'}]} label="Authenticate account" onPress={() => confirmSignUp()} />
      <View style={styles.textContainer}>
        <Text style={[styles.signInText]}>Haven't received it? </Text>
        <TouchableOpacity
        disabled = {spamTimeout}
          onPress={() => { //Resend Code Btton
            setSpamTimeout(true);
            resendConfirmationCode();
            setTimeout(() => { setSpamTimeout(false);}, 30000); //Prevent Spamming Button
          }
        }
        >
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
  inputsContainer:{
    position: 'absolute',
    justifyContent: 'space-evenly',
    width: "100%",
    top: "34%",
    flexDirection: 'row',
  },
  inputContainer:{
    width: "10%",
    alignItems: 'center',
    borderBottomColor:'#8F8F8F',
    borderBottomWidth: 1,
  },
  inputContainerFocused:{
    borderBottomColor:'#000',
  },
  inputText:{
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },
  hiddenCodeInput:{
    position:'absolute',
    height: 0,
    width:0,
    opacity: 0,
    backgroundColor: '#f0f'
  },
  labelStyle:{
    position: 'absolute',
    left: "6.2%",
    top: "29%",
    color: '#8F8F8F',
    fontSize:15,
    fontFamily: 'Nunito_700Bold',
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
