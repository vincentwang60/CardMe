import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import { listUsers, getUser } from '../graphql/queries.js';
import { updateUser, createUser } from '../graphql/mutations.js';
import Input from './shared/input.js';
import Button from './shared/button.js';

//Form for user to add or edit information about themselves (ie Name, nickname, email, university, socials)
//TODO allow mutations of User in graphQl database rather than just creating

export default function informationEditScreen( {route, navigation }) {
  const {email} = route.params;
  const {card} = route.params; //card being edited can be passed to set cardId. if not passed will be set to new card
  const { handleSubmit, reset, control, formState: {errors} } = useForm();
  const [loading, setLoading] = useState(true)
  const [inputArr, setInputArr] = useState() //array of the input components based on data from the card
  const [defaultValue, setDefaultValue] = useState()
  const [cardId, setCardId] = useState() //id of card currently being edited

  useEffect(()=>{//runs once every time this screen is loaded
    console.log('--------LOADING INFO EDIT SCREEN--------')
    fetchUserData();
  },[]);

  useEffect(()=>{//calls when inputarr is changed
    if(inputArr != null){
      console.log('successfully set up info screen')
      setLoading(false) //once inputarr is changed to something other than null, gives green light to render screen
    }
  }, [inputArr])

  useEffect(()=>{//just for debugging
    console.log('card id set to:', cardId)
  }, [cardId])

  useEffect(()=>{//sets the defaults when defaultValue is changed
    reset(defaultValue)
  }, [defaultValue])

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
          console.log('setting up using existing card')
          createInputArr(cardsCreated[0])
          setDefaultValues(cardsCreated[0])
          setCardId(cardsCreated[0].id)
        }
      }
    }
    catch (error) {
      console.log('Error on info screen fetchUserData', error);
    }
  }
  //creates a new empty card under the user and sets it as 'card' state, called if card doesnt exist
  const createCard = async(user)=>{
    console.log('info screen creating card')
    const newContent = {id: uuidv4(), name: 'Name', data: 'Enter name here'}
    const newOwnedCard = { id: uuidv4(), title: 'title', content: [newContent]}
    const newUpdateUser = {
      id: user.id,
      email: user.email,
      cardsCreated: user.cardsCreated ? [...user.cardsCreated, newOwnedCard]: [newOwnedCard]
    }
    const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
    createInputArr(newOwnedCard)
    setDefaultValues(newOwnedCard)
    console.log('setting card id createCard', newOwnedCard.id)
    setCardId(newOwnedCard.id)
    console.log('finished creating new card', newOwnedCard, '\nfor user:', user)
  }
  //creates a new field, called by add field Button
  const addField = async() => {
    console.log('info screen adding a field')
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      var user = fetchedUserData.data.listUsers.items[0]
      const tempCardId = user.cardsCreated[0].id //TODO DELETE THIS WHEN CARDID BUG IS FIXED
      console.log('fetched user in addField', user)
      const newContent = {id: uuidv4(), name: 'Enter field name', data: 'Enter information here'}
      const currentCardIndex = user.cardsCreated.findIndex(x => x.id === tempCardId)//get the index of current card from the cardsCreated array
      user.cardsCreated[currentCardIndex].content.push(newContent) //adds newContent to the end of the current card's content array
      const newUpdateUser = {
        id: user.id,
        email: user.email,
        cardsCreated: user.cardsCreated,
        savedCards: user.savedCards
      }
      const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
      createInputArr(user.cardsCreated[currentCardIndex])
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
    for (var i = 0; i < card.content.length; i++){
      defaultValueObj[card.content[i].id] = card.content[i].data
    }
    setDefaultValue(defaultValueObj)
  }
  //sets up array of inputs for react hook form based on user data
  function createInputArr(card) {
    console.log('creating input arr')
    var tempArr = [] //temp array that inputArr is set to once completed
    for (var i = 0; i < card.content.length; i++){
      const name = card.content[i].name
      const topPosition = (29+i*10).toString()+'%'
      const newInput =
        <Controller
          key={i}
          name={card.content[i].id}
          control={control}
          rules={{
            required: {value: true, message: 'Please enter your name'},
          }}
          render={({field: {onChange, value}})=>(
            <Input
              error={errors.name}
              containerStyle={[styles.input, { top: topPosition}]}
              label={name}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
      tempArr.push(newInput)
    }
    const topPosition = (29+card.content.length*10).toString()+'%'
    const addFieldButton =
      <Button
        key={card.content.length}
        containerStyle={[styles.input, { top: topPosition}]}
        label="add field"
        onPress={()=>{addField()}}
      />
    tempArr.push(addFieldButton)
    setInputArr(tempArr)
  }
  const setInformation = async (data) => {
    try{
      console.log('setting information with data:\n', data,'\nediting card:', cardId)
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      const user = fetchedUserData.data.listUsers.items[0]
      const cardsCreated = user.cardsCreated
      const currentCardIndex = cardsCreated.findIndex(card => card.id === cardId)//get the index of current card from the cardsCreated array
      const currentCard = cardsCreated[currentCardIndex]
      const newContents = []
      for (var i = 0; i < currentCard.content.length; i++){//loop through content for the selected card to setup newContent0
        var newContent = {id: currentCard.content[i].id, name: currentCard.content[i].name, data: data[currentCard.content[i].id]}
        newContents.push(newContent)
      }
      currentCard.content = newContents
      cardsCreated[currentCardIndex] = currentCard //update the card from cards created
      const newUpdateUser = {
        id: user.id,
        email: user.email,
        cardsCreated: cardsCreated,
        savedCards: user.savedCards
      }
      const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
      console.log('successfully updated data')
    }
    catch (error) {
      console.log('Error on information edit screen setInformation', error)
    }
  }
  //Called when submit button is pressed, calls setInformation
  function onSubmit(data){
    setInformation(data)
  }
  const toLayoutEdit = () => {
    navigation.navigate('layoutEditScreen', {email: email})
  }
  const toHome = () => {
    navigation.navigate('homeScreen', {email: email})
  }

  if(loading){
    return(
      <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
        <Text>Loading</Text>
        <Button
          containerStyle={[styles.input, { top: '76.0%'}]}
          label="force complete loading"
          onPress={()=>{setLoading(false)}}
        />
      </LinearGradient>
    )
  }
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
     <Text style = {[styles.text, {top: '10%'}]}>Information edit{'\n'}screen placeholder</Text>
      {inputArr}
      <Button
        containerStyle={[styles.input, { top: '69.0%'}]}
        label="Set information"
        onPress={handleSubmit(onSubmit)}
      />
      <Button
        containerStyle={[styles.input, { top: '76.0%'}]}
        label="To layout edit"
        onPress={toLayoutEdit}
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
