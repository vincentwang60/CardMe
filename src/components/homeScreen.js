import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Entypo  } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Button from './shared/button.js'
import Input from './shared/input.js';
import Card1 from './shared/card1.js'
import { listUsers, getUser } from '../graphql/queries.js';
import { updateUser, createUser } from '../graphql/mutations.js';

export default function homeScreen( {route, navigation }) {
  const isFocused = useIsFocused(); //used to make sure useEffect is called even when component already loaded
  const [showQR, setShowQR] = useState(false)
  const { handleSubmit, watch, control, formState: {errors} } = useForm();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState();
  const [noCards, setNoCards] = useState(true) //tracks whether the user already has a card to show

  const createQRCodeComponent = () => {
    const stringExp = String(userData.id)+String(userData.cardsCreated[0].id)
    if(showQR){
      QRCodeComponent =
      <View style = {[styles.QRCodeComponent]}>
      <QRCode
        value={stringExp}
      />
        <TouchableOpacity
          onPress={()=>{
            setShowQR(false)
          }}
          style={styles.touchable}>
          <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    }
  }

  let QRCodeComponent;

  useEffect(()=>{//runs once every time this screen is loaded
    console.log('home screen is focused')
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
      if (userData.cardsCreated != null){
        console.log('hs userdata eff creating qr code', userData)
        createQRCodeComponent()
      }
    }
  }, [userData])

  useEffect(()=>{//called when email is changed
    if(email != null){
      fetchUserData()
    }
  }, [email])

  async function share(data, creatorID, cardId){//called when share button is pressed, puts card in target users 'savedCards'
    console.log('hs sharing with', data,creatorID, 'card id:',cardId)
    const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: data.email}}}))
    const user = fetchedUserData.data.listUsers.items[0]
    var newSavedCards = []
    console.log('hs share found user:', user)
    if (user.savedCards === null){//if target user has no saved cards
      console.log('no saved cards')
      newSavedCards.push({id: uuidv4(), creatorID: creatorID, cardId: cardId})
    }
    else{
      console.log('saved cards:', user.savedCards)
      user.savedCards.push({id: uuidv4(), creatorID: creatorID, cardId: cardId})
      newSavedCards = user.savedCards
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
    share(data, userData.id, userData.cardsCreated[0].id)
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
  const qrScan = () => {
    console.log('starting qr scan')
    navigation.navigate('qrScanScreen',{email: email})
  }
  const createQR = () => {
    setShowQR(true)
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
          console.log('home screen no cards found',noCards)
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
        <View style = {{alignItems: 'center'}}>
          <Button
            buttonStyle = {styles.button}
            label='Add card +'
            onPress = {toEdit}
          />
          <Text style = {styles.grayText}>Let's get started by {'\n'}adding your first card!</Text>
        </View>
        <StatusBar
          barStyle = "dark-content"
          backgroundColor = '#fff'/>
       </LinearGradient>
    )
  }
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={[styles.container, {justifyContent: 'flex-start'}]}>
    <Text style = {[styles.text, {top: '1%'}]}>Home screen{'\n'}placeholder</Text>
    <Card1
      containerStyle={[styles.items, { top: '20.0%'}, {left: "10%"}]}
      data={userData.cardsCreated[0]}
    />
    <Button
      containerStyle={[styles.items, { top: '60.0%'}]}
      label='Share via QR code'
      onPress = {createQR}
    />
    <Button
      containerStyle={[styles.items, { top: '76.0%'}]}
      label='QR code test'
      onPress = {qrScan}
    />
    <Button
      containerStyle={[styles.items, { top: '86.0%'}]}
      label='Go to edit screen'
      onPress = {toEdit}
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

    {QRCodeComponent}
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
  touchable:{
    top:'-100%',
    left: '15%',
  },
  QRCodeComponent:{
    alignItems: 'center',
    top:'15%',
  },
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
  button: {
    width: Dimensions.get('window').width*.42,
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
