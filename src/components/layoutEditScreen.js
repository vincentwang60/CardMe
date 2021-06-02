import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import { listUsers } from '../graphql/queries.js';
import * as mutations from '../graphql/mutations.js';
import FieldInput from './shared/fieldInput.js';
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
  function cancel(){ //called by cancel button
    console.log('cancel button doesnt actually cancel (yet)')
    navigation.navigate('homeTabs')
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
      <Text style = {[styles.text, {top: '5%'}]}>Add card</Text>
      <TouchableOpacity style = {[styles.touchable, {left: '5%'}]} onPress={cancel}>
        <Text style = {[styles.text, {top: '4.5%'}, {fontSize: 15}]}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.touchable, {left: '85%'}]} onPress={handleSubmit(onSubmit)}>
        <Text style = {[styles.text, {top: '4.5%'}, {fontSize: 15}]}>Done</Text>
      </TouchableOpacity>

      <Controller
        name='cardNickname'
        control={control}
        rules={{
          required: {value: true, message: 'Temp error message'},
        }}
        render={({field: {onChange, value}})=>(
        <FieldInput
          error={errors.displayName}
          containerStyle={[styles.fieldInputPart, {top: '10%'}]}
          label='Card Nickname'
          onChangeText={(text) => onChange(text)}
          value={value}
          placeholder='e.g. Orientation Week 2021'
        />
        )}
      />
      <StatusBar
        barStyle = "dark-content"
        backgroundColor = '#fff'/>
    </LinearGradient>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
  },
  profile:{
    top: '8%',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
  fieldInput:{
    position: 'absolute',
    left: "5.2%",
    flexDirection: 'row',
  },
  touchable:{
    position: 'absolute',
    top: '5.5%',
  },
});
