import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import { listUsers, getUser } from '../graphql/queries.js';
import { updateUser, createUser } from '../graphql/mutations.js';
import FieldInput from './shared/fieldInput.js';
import Input from './shared/input.js';
import Button from './shared/button.js';

export default function layoutEditScreen( {route, navigation }) {
  const { handleSubmit, reset, control, formState: {errors} } = useForm();
  const {cardId} = route.params;
  const [email, setEmail] = useState();
  const [updated, setUpdated] = useState(false)
  const [defaultValue, setDefaultValue] = useState()

  useEffect(()=>{
    console.log('loading layout screen')
    getUser()
  }, [])
  useEffect(()=>{//sets the defaults when defaultValue is changed
    reset(defaultValue)
  }, [defaultValue])
  useEffect(()=>{
    if(updated){
      console.log('layout finished updating, going to home screen')
      navigation.navigate('homeTabs')
    }
  },[updated])
  useEffect(()=>{
    if(email!=null){
      console.log('layout screen retrieved props:', email,cardId)
      setDefaultValues()
    }
  },[email])
  async function setDefaultValues(){
    const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
    const user = fetchedUserData.data.listUsers.items[0]
    const currentCardIndex = user.cardsCreated.findIndex(x => x.id === cardId)
    const card = user.cardsCreated[currentCardIndex]
    console.log('layout setting default card:', card)
    var defaultValueObj = {}
    if (card.title.length > 0) {
      defaultValueObj['nickname'] = card.title
    }
    console.log('created default values', defaultValueObj)
    setDefaultValue(defaultValueObj)
  }
  async function getUser(){
    const { attributes } = await Auth.currentAuthenticatedUser();
    setEmail(attributes.email)
  }

  function onSubmit(data){
    setInformation(data)
  }
  const toHome = () => {
    navigation.navigate('homeTabs', {email: email})
  }
  async function setInformation(data){
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      const user = fetchedUserData.data.listUsers.items[0]
      const cardsCreated = user.cardsCreated
      const currentCardIndex = cardsCreated.findIndex(card => card.id === cardId)//get the index of current card from the cardsCreated array
      const currentCard = cardsCreated[currentCardIndex]
      currentCard.title = data.nickname
      cardsCreated[currentCardIndex] = currentCard //update the card from cards created
      const newUpdateUser = {
        id: user.id,
        email: user.email,
        cardsCreated: cardsCreated,
        savedCards: user.savedCards
      }
      const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
      setUpdated(true)
      console.log('layout screen successfully updated data')
    }
    catch (error){
      console.log('error on setInformation', error);
    }
  }
  function cancel(){ //called by cancel button
    console.log('cancel button doesnt actually cancel (yet)')
    navigation.navigate('layoutEditScreen')
  }

  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '5%'}]}>Edit Layout</Text>
      <TouchableOpacity style = {[styles.touchable, {left: '5%'}]} onPress={cancel}>
        <Text style = {[styles.text, {top: '4.5%'}, {fontSize: 15}]}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.touchable, {left: '85%'}]} onPress={handleSubmit(onSubmit)}>
        <Text style = {[styles.text, {top: '4.5%'}, {fontSize: 15}]}>Done</Text>
      </TouchableOpacity>

      <Controller
        name='nickname'
        control={control}
        rules={{
          required: {value: true, message: 'Please enter a name for your card'},
        }}
        render={({field: {onChange, value}})=>(
          <FieldInput
            error={errors.nickname}
            containerStyle={[styles.fieldInputPart, {top: '10%'}]}
            label='Card Nickname'
            onChangeText={(text) => onChange(text)}
            value={value}
            placeholder='e.g. Orientation Week 2022'
          />
        )}
      />
      <Text style = {[styles.smallText,{top:'20%'}]}>Select a style</Text>
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
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
  smallText:{
    position: 'absolute',
    left: '7.5%',
    fontSize: 15,
    paddingVertical: 40,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
  input:{
    position: 'absolute',
    left: "6.2%",
    borderRadius: 5,
  },
  touchable:{
    position: 'absolute',
    top: '5.5%',
  },
});
