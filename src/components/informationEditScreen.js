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
  const { handleSubmit, reset, control, formState: {errors} } = useForm();
  const [loading, setLoading] = useState(true)
  const [inputArr, setInputArr] = useState([]) //array of the input components based on data from the card
  const [defaultValue, setDefaultValue] = useState()
  const [cardId, setCardId] = useState()


  useEffect(()=>{//runs once every time this screen is loaded
    fetchUserData();
    setLoading(false)
  },[]);

  useEffect(()=>{//sets the defaults when defaultValue is changed
    reset(defaultValue)
  }, [defaultValue])

  //called when screen is first loaded, creates card/user if dont exist
  const fetchUserData = async () => {
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(getUser, {id: email}))
      if (fetchedUserData.data.getUser == null){//if user not yet been created, create user and card
        createNewUser()
      }
      else{//if user already created, check for cards
        const cardsCreated = fetchedUserData.data.getUser.cardsCreated
        if(cardsCreated == null) {
          createCard(fetchedUserData.data.getUser)
        }
        else{
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
    const newContent = {id: uuidv4(), name: 'content name', data: 'New data name'}
    const newOwnedCard = { id: uuidv4(), title: 'title', content: newContent}
    const newUpdateUser = {
      id: user.id,
      cardsCreated: user.cardsCreated ? [...user.cardsCreated, newOwnedCard]: [newOwnedCard]
    }
    const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
    createInputArr(newOwnedCard)
    setDefaultValues(newOwnedCard)
    setCardId(newOwnedCard.id)
    console.log('created new card', newOwnedCard, '\nfor user:', user)
  }
  //create an empty new user, called if user doesn't exist yet
  const createNewUser = async() => {
    const newUser = {id: email }
    const output = await API.graphql(graphqlOperation(createUser, {input: newUser}))
    console.log('created new user:', newUser)
    createCard(newUser)
    return newUser
  }
  //sets default values for react hook form inputs based on data from card
  const setDefaultValues = async(card) => {
    var defaultValueObj = {}
    for (var i = 0; i < card.content.length; i++){
      defaultValueObj[card.content[i].id] = card.content[i].data
    }
    setDefaultValue(defaultValueObj)
  }
  //sets up array of inputs for react hook form based on user data
  function createInputArr(card) {
    var tempArr = [] //temp array that inputArr is set to once completed
    for (var i = 0; i < card.content.length; i++){
      const name = card.content[i].name
      const topPosition = (29+i*10).toString()+'%'
      const newInput =
        <Controller
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
    setInputArr(tempArr)
  }
  const setInformation = async (data) => {
    try{
      console.log('received data:', data,' . editing card:', cardId)
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
      <Text>Loading</Text>
    )
  }
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
     <Text style = {[styles.text, {top: '10%'}]}>Information edit{'\n'}screen placeholder</Text>
      {inputArr[0]}
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
