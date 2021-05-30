import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import { listUsers } from '../graphql/queries.js';
import * as mutations from '../graphql/mutations.js';
import Input from './shared/input.js';
import Button from './shared/button.js';

//Form for user to add or edit information about themselves (ie Name, nickname, email, university, socials)
//TODO allow mutations of User in graphQl database rather than just creating
export default function layoutEditScreen( {route, navigation }) {
  //const {email} = route.params; //TODO DOESNT WORK WITH REACT TABS, hopefully not necessary??
  const { handleSubmit, control, formState: {errors} } = useForm();
  const [email, setEmail] = useState();

  useEffect(()=>{
    getUser()
  }, [])

  async function getUser(){
    const { attributes } = await Auth.currentAuthenticatedUser();
    setEmail(attributes.email)
  }

  //Called when submit button is pressed, calls setInformation
  function onSubmit(data){
    data.id = email;
    console.log('data', data)
    setInformation(data)
  }
  const toHome = () => {
    navigation.navigate('homeTabs', {email: email})
  }
  //Called by onSubmit, creates User on graphQl database based on information in form
  async function setInformation(data){
    console.log('made it!', data)
    try{
      await API.graphql({ query: mutations.createUser, variables: {input: data}});
      navigation.navigate('homeTabs', {email: email})
    }
    catch (error){
      console.log('error on setInformation', error);
    }
  }

  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '10%'}]}>Layout edit{'\n'}screen placeholder</Text>
      <Controller
        name='name'
        control={control}
        rules={{
          required: {value: true, message: 'Please enter your name'},
        }}
        render={({field: {onChange, value}})=>(
          <Input
            error={errors.name}
            containerStyle={[styles.input, { top: '29.0%'}]}
            label="Name"
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
      />
      <Button
        containerStyle={[styles.input, { top: '69.0%'}]}
        label="Set information"
        onPress={handleSubmit(onSubmit)}
      />
      <Button
        containerStyle={[styles.input, { top: '83.0%'}]}
        label="To home"
        onPress={toHome}
      />
      <StatusBar
        barStyle = "light-content"
        backgroundColor = '#000'/>
    </LinearGradient>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
    fontFamily: 'Inter_600SemiBold',
  },
  input:{
    position: 'absolute',
    left: "6.2%",
  },
});
