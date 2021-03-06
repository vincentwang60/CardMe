import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Amplify, {Auth} from "aws-amplify";
import AWSConfig from '../../aws-exports'
import { useForm, Controller } from "react-hook-form";
Amplify.configure(AWSConfig)


import Button from './shared/button.js';
import Input from './shared/input.js';

export default function verificationCodeForgotPassword( {route, navigation }) {
  const {email} = route.params;
  const [confirmationCode, setConfirmationCode] = useState('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const codeDigitsArray = new Array(6).fill(0)
  const ref = useRef();
  const [spamTimeout, setSpamTimeout] = useState(false);
  const { handleSubmit, watch, control, formState:{errors} } = useForm();

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
  function onSubmit(data){
    console.log(data)
    forgotPasswordSubmit(email,confirmationCode,data.newPassword)
  }
  function toggleIsNewUser() {
    setIsNewUser(!isNewUser);
  }
  function signIn (){
    console.log('signing in as', passedEmail)
    const user = Auth.signIn(passedEmail, passedPassword)
    .then(()=>{
      console.log('successful login!');
      navigation.navigate('informationScreen', {email: passedEmail})
    })
    .catch(err=>console.log('error on login!',err))
  }

  function forgotPasswordSubmit(email, code, new_password){
    Auth.forgotPasswordSubmit(email, code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
  function forgotPassword(email){
    // Send confirmation code to user's email
    Auth.forgotPassword(email)
        .then(data => console.log(data))
        .catch(err => console.log(err));

  }
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style={[styles.text, { top: '10.9%'}]}>Authenticate your request!</Text>
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
      <Controller
        name='newPassword'
        rules={{
          required:{value:true, message:'Please enter a password'}
        }}
        control={control}
        render={({field: {onChange, value }})=>(
          <Input
            containerStyle={[styles.input, { top: '0.8%', left: '7.5%'}]}
            errors={errors.newPassword}
            //Centering is ok visually, but most likely not technically centered see 7.5% fix later
            label="New Password"
            onChangeText={text => onChange(text)}
            value={value}
          />
        )}
      />
      <Button containerStyle={[styles.textContainer, { top: '81.5%'}]} label="Authenticate account" onPress={handleSubmit(onSubmit)} />
      <View style={styles.textContainer}>
        <Text style={[styles.signInText]}>Haven't received it? </Text>
        <TouchableOpacity
        disabled = {spamTimeout}
          onPress={() => { //Resend Code Btton
            setSpamTimeout(true);
            forgotPassword(email);
            setTimeout(() => { setSpamTimeout(false);}, 3000); //Prevent Spamming Button
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
    borderRadius: 5,
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
