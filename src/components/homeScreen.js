import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Entypo  } from '@expo/vector-icons';
import { Accelerometer } from 'expo-sensors';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Button from './shared/button.js'
import Input from './shared/input.js';
import Card1 from './shared/card1.js'
import { listUsers, getUser } from '../graphql/queries.js';
import { updateUser, createUser } from '../graphql/mutations.js';

export default function homeScreen( {route, navigation }) {
  const isFocused = useIsFocused(); //used to make sure useEffect is called even when component already loaded
  const { handleSubmit, watch, control, formState: {errors} } = useForm();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState();
  const [noCards, setNoCards] = useState(true) //tracks whether the user already has a card to show

  //TEST for accelerometer
  const MINUTE_MS = 100;

  /*useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every minute');
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])*/
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  const { x, y, z } = data;
  //TEST

  useEffect(()=>{//runs once every time this screen is loaded
    setLoading(true)
    if(isFocused){
      getUser()
    }
    if(email != null){//refresh userdata even if email isn't changed
      fetchUserData()
    }
  },[isFocused]);

  useEffect(()=>{//called when userData is changed
    if(userData != null){
      console.log('successfully fetched userData')
      setLoading(false) //once inputarr is changed to something other than null, gives green light to render screen
    }
  }, [userData])

  useEffect(()=>{//called when email is changed
    if(email != null){
      fetchUserData()
    }
  }, [email])

  async function share(data, creatorID, cardId){//called when share button is pressed, puts card in target users 'savedCards'
    const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: data.email}}}))
    const user = fetchedUserData.data.listUsers.items[0]
    const newSavedCards = []
    console.log('hs share found user:', user)
    if (user.savedCards === null){//if target user has no saved cards
      console.log('no saved cards')
      newSavedCards.push({id: uuidv4(), creatorID: creatorID, cardId: cardId})
    }
    else{
      console.log('saved cards:', user.savedCards)
      user.savedCards.push({id: uuidv4(), creatorID: creatorID, cardId: cardId})
    }
    console.log('created newSavedCards:', newSavedCards)
    const newUpdateUser = {
      id: user.id,
      email: user.email,
      cardsCreated: user.cardsCreated,
      savedCards: newSavedCards
    }
    const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
    console.log('updated target user:', newUpdateUser)
  }
  function onSubmit(data){
    console.log('home screen submitting with data:', data)
    console.log('hs sharing card:', userData.cardsCreated[0]) //TODO CHANGE THIS, CURRENTLY SENDS FIRST CARD IN cardsCreated
    share(data, userData.cardsCreated[0])
  }

  async function getUser(){
    const { attributes } = await Auth.currentAuthenticatedUser();
    setEmail(attributes.email)
  }
  const toEdit = () => {
    navigation.navigate('editScreen', {
      screen: 'informationEditScreen',
      params: {email: email, card: null},
    })
  }
  const createNewUser = async() => {
    console.log('info screen creating new user')
    const newUser = {id: uuidv4(), email: email }
    const output = await API.graphql(graphqlOperation(createUser, {input: newUser}))
    console.log('created new user:', newUser)
    setNoCards(true)
    setUserData(newUser)
    return newUser
  }
  function breakEverything() {//debug method, empty for now
    console.log('home screen breaking everything')
  }
  const fetchUserData = async () => {//will fetch card to display for logged in user from dynamodb
    console.log('home screen fetching user')
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      const user = fetchedUserData.data.listUsers.items[0]
      if (user == null){//if user not yet been created, create user and card
        console.log('home screen creating new user')
        createNewUser()
      }
      else{//if user already created, set userdata
        if (user.cardsCreated != null){
          setNoCards(false)
        }
        else{
          console.log('home screen no cards found')
        }
        setUserData(user);
      }
    }
    catch (error) {
      console.log('Error on home screen fetchUserData', error);
    }
  };

  if (loading){
    return(
      <Text>loading</Text>
    )
  }
  if (noCards){
    return(
      <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
        <Text style = {styles.myCardsText}>My cards</Text>
        <TouchableOpacity style = {styles.icon} onPress={toEdit}>
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
        <Text style = {styles.grayText}>Let's get started by {'\n'}adding your first card!</Text>
        <StatusBar
          barStyle = "dark-content"
          backgroundColor = '#fff'/>
       </LinearGradient>
    )
  }
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={[styles.container, {justifyContent: 'flex-start'}]}>
   <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
    <Text>
      x: {x}{'\n'}y: {y}{'\n'}z: {z}
    </Text>
    <Text style = {[styles.text, {top: '1%'}]}>Home screen{'\n'}placeholder</Text>
    <Card1
      containerStyle={[styles.items, { top: '20.0%'}, {left: "10%"}]}
      data={userData.cardsCreated[0]}
    />
    <Button
      containerStyle={[styles.items, { top: '86.0%'}]}
      label='Go to edit screen'
      onPress = {toEdit}
    />
    <Button
      containerStyle={[styles.items, { top: '80.0%'}]}
      label='Break everything'
      onPress = {breakEverything}
    />
    <Controller
      name='email'
      control={control}
      rules={{
        required: {value: true, message: 'Please enter an email'},
        pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Enter a valid e-mail address",}
      }}
      render={({field: {onChange, value }})=>(
        <Input
          error={errors.email}
          containerStyle={[styles.input, { top: '43.8%'}]}
          label="Share via email"
          onChangeText={(text) => onChange(text)}
          value={value}
        />
      )}
    />
    <Button
      containerStyle={[styles.input, { top: '53.0%'}]}
      label="Share"
      onPress={handleSubmit(onSubmit)}
    />
      <StatusBar
        barStyle = "dark-content"
        backgroundColor = '#fff'/>
    </LinearGradient>
  );
}
/*
*/
//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: '90%',
    top: '4.5%',
  },
  myCardsText: {
    position: 'absolute',
    top: '4%',
    left: '4%',
    fontSize: 20,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
  grayText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#8F8F8F',
    fontFamily: 'Nunito_700Bold',
  },
  items:{
    position: 'absolute',
    left: "6.2%",
  },
  input:{
    position: 'absolute',
    left: "6.2%",
  },
});
