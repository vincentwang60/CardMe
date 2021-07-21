import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesome } from '@expo/vector-icons';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import { listUsers, getUser } from '../graphql/queries.js';
import { updateUser, createUser } from '../graphql/mutations.js';
import FieldInput from './shared/fieldInput.js';
import Input from './shared/input.js';
import Button from './shared/button.js';

export default function informationEditScreen( {route, navigation }) {
  const {email} = route.params;
  const {card} = route.params; //card being edited can be passed to set cardId. if not passed will be set to new card
  const { handleSubmit, reset, control, formState: {errors} } = useForm();
  const [defaultValue, setDefaultValue] = useState()
  const [updated, setUpdated] = useState(false)
  const [cardId, setCardId] = useState()

  useEffect(()=>{//runs once every time this screen is loaded
    console.log('----info edit screen received params',email,cardId)
    setCardId(card)
    fetchUserData();
  },[]);

  useEffect(()=>{//sets the defaults when defaultValue is changed
    reset(defaultValue)
  }, [defaultValue])

  useEffect(()=>{
    if(updated){
      navigation.navigate('layoutEditScreen',{email:email,cardId:cardId})
    }
  }, [updated])

  //called when screen is first loaded, creates card/user if dont exist
  const fetchUserData = async () => {
    console.log('fetching user data')
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      const user = fetchedUserData.data.listUsers.items[0]
      if (user == null){//if user not yet been created, create user and card
        createNewUser()
      }
      else{//if user already created, check for cards
        const cardsCreated = user.cardsCreated
        if(cardsCreated == null) {
          createCard(user)
        }
        else{
          console.log('setting up using existing card', cardsCreated[0])
          setDefaultValues(cardsCreated[0])
        }
      }
    }
    catch (error) {
      console.log('Error on info screen fetchUserData', error);
    }
  }
  function cancel(){ //called by cancel button
    console.log('cancel button doesnt actually cancel (yet)')
    navigation.navigate('layoutEditScreen')
  }
  //creates a new empty card under the user and sets it as 'card' state, called if card doesnt exist
  const createCard = async(user)=>{
    console.log('info screen creating card')
    const newOwnedCard = { id: uuidv4(), title: 'title'}
    const newUpdateUser = {
      id: user.id,
      email: user.email,
      cardsCreated: user.cardsCreated ? [...user.cardsCreated, newOwnedCard]: [newOwnedCard]
    }
    const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
    setDefaultValues(newOwnedCard)
    console.log('setting card id createCard', newOwnedCard.id)
    console.log('finished creating new card', newOwnedCard, '\nfor user:', user)
    setCardId(newOwnedCard.id)
  }

  //creates a new field, called by add field Button
  const addField = async() => {
    console.log('info screen adding a field')
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      var user = fetchedUserData.data.listUsers.items[0]
      const tempCardId = user.cardsCreated[0].id //TODO REPLACE THIS WHEN CARDID IS PASSED IN
      console.log('fetched user in addField', user)
      const currentCardIndex = user.cardsCreated.findIndex(x => x.id === tempCardId)//get the index of current card from the cardsCreated array
      const newUpdateUser = {
        id: user.id,
        email: user.email,
        cardsCreated: user.cardsCreated,
        savedCards: user.savedCards
      }
      const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
      setDefaultValues(user.cardsCreated[currentCardIndex])
    }
    catch (error) {
      console.log('error on info screen add field', error)
    }
  }

  //create an empty new user, called if user doesn't exist yet
  const createNewUser = async() => {
    console.log('info screen creating new user')
    const newUser = {id: uuidv4(), email: email }
    const output = await API.graphql(graphqlOperation(createUser, {input: newUser}))
    console.log('created new user:', newUser)
    createCard(newUser)
    return newUser
  }

  //sets default values for react hook form inputs based on data from card
  const setDefaultValues = async(card) => {
    console.log('info screen setting default values')
    var defaultValueObj = {}
    if (card.content != undefined){
      if (card.content.filter(e => e.name === 'displayName').length > 0) {
        const index = card.content.findIndex(content => content.name === 'displayName')
        defaultValueObj['displayName'] = card.content[index].data
      }
      if (card.content.filter(e => e.name === 'heading').length > 0) {
        const index = card.content.findIndex(content => content.name === 'heading')
        defaultValueObj['heading'] = card.content[index].data
      }
      if (card.content.filter(e => e.name === 'subHeading').length > 0) {
        const index = card.content.findIndex(content => content.name === 'subHeading')
        defaultValueObj['subHeading'] = card.content[index].data
      }
    }
    console.log('created default values')
    setDefaultValue(defaultValueObj)
  }
  const setInformation = async (data) => {
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      //console.log('fetch info fetchedUserData', fetchedUserData)
      const user = fetchedUserData.data.listUsers.items[0]
      console.log('fetch info user', user)
      const cardsCreated = user.cardsCreated
      const currentCardIndex = cardsCreated.findIndex(card => card.id === cardId)//get the index of current card from the cardsCreated array
      const currentCard = cardsCreated[currentCardIndex]
      console.log('current card', currentCard)
      const newContents = []
      newContents.push({id: uuidv4(), name: 'displayName', data: data.displayName})
      newContents.push({id: uuidv4(), name: 'heading', data: data.heading})
      newContents.push({id: uuidv4(), name: 'subHeading', data: data.subHeading})
      currentCard.content = newContents
      cardsCreated[currentCardIndex] = currentCard //update the card from cards created
      const newUpdateUser = {
        id: user.id,
        email: user.email,
        cardsCreated: cardsCreated,
        savedCards: user.savedCards
      }
      const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
      setUpdated(true)
      console.log('successfully updated data')
    }
    catch (error) {
      console.log('Error on information edit screen setInformation', error)
    }
  }
  //Called when submit button is pressed, calls setInformation

  function onSubmit(data){
    console.log('info scr submitting with', data)
    setInformation(data)
  }
  const toHome = () => {
    navigation.navigate('homeTabs')
  }
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '5%'}]}>Edit info</Text>
      <TouchableOpacity style = {[styles.touchable, {left: '5%'}]} onPress={cancel}>
        <Text style = {[styles.text, {top: '4.5%'}, {fontSize: 15}]}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.touchable, {left: '85%'}]} onPress={handleSubmit(onSubmit)}>
        <Text style = {[styles.text, {top: '4.5%'}, {fontSize: 15}]}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.profile]} onPress={()=>{console.log('TODO')}}>
        <FontAwesome name="user-circle-o" size={80} color="black" />
        <Text style= {[styles.text, {top: '4.5%'}, {fontSize: 15}]}>Upload photo</Text>
      </TouchableOpacity>

      <Controller
        name='displayName'
        control={control}
        rules={{
          required: {value: true, message: 'Please enter a display name'},
        }}
        render={({field: {onChange, value}})=>(
          <FieldInput
            error={errors.displayName}
            containerStyle={[styles.fieldInputPart, {top: '10%'}]}
            label='Display name'
            onChangeText={(text) => onChange(text)}
            value={value}
            placeholder='John Smith'
          />
        )}
      />
      <Controller
        name='heading'
        control={control}
        render={({field: {onChange, value}})=>(
          <FieldInput
            error={errors.heading}
            containerStyle={[styles.fieldInputPart, {top: '10%'}]}
            label='Heading'
            onChangeText={(text) => onChange(text)}
            value={value}
            placeholder='Co-president of CUAPAHM'
          />
        )}
      />
      <Controller
        name='subHeading'
        control={control}
        render={({field: {onChange, value}})=>(
          <FieldInput
            error={errors.subHeading}
            containerStyle={[styles.fieldInputPart, {top: '10%'}]}
            label='Sub-heading'
            onChangeText={(text) => onChange(text)}
            value={value}
            placeholder='Class of 2022'
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
  input:{
    position: 'absolute',
    left: "6.2%",
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
