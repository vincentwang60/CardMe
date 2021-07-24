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
import Card1 from './shared/card1.js'
import Style1 from '../assets/style1.js';
import Style2 from '../assets/style2.js';
import Style3 from '../assets/style3.js';

export default function layoutEditScreen( {route, navigation }) {
  const { handleSubmit, reset, control, formState: {errors} } = useForm();
  const {cardId} = route.params;
  const [email, setEmail] = useState();
  const [cardData, setCardData] = useState();
  const [updated, setUpdated] = useState(false)
  const [defaultValue, setDefaultValue] = useState()
  const [selectedStyle, setSelectedStyle] = useState()
  const [borderX, setBorderX] = useState('6.8%')
  const [loading, setLoading] = useState(true)
  const [card, setCard] = useState()

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
  useEffect(()=>{
    if(card != null){
      setLoading(false)
    }
  },[card])
  useEffect(()=>{
    if(cardData != null){
      console.log('updating card style from', cardData.style, 'to', selectedStyle)
      cardData.style = selectedStyle
      let c =
        <View style = {[styles.cards]}>
          <Card1
            containerStyle = {styles.card}
            data = {cardData}
          />
        </View>
      setCard(c)
      console.log('new card style', cardData)
    }
  },[selectedStyle])
  async function setDefaultValues(){
    const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
    const user = fetchedUserData.data.listUsers.items[0]
    const currentCardIndex = user.cardsCreated.findIndex(x => x.id === cardId)
    const card = user.cardsCreated[currentCardIndex]
    setCardData(card)
    setSelectedStyle(card.style)
    console.log('layout setting default card:')
    var defaultValueObj = {}
    if (card.title.length > 0) {
      defaultValueObj['nickname'] = card.title
    }
    if(card.style == 1){
      setBorderX('6.8%')
    }
    else if(card.style == 2){
      setBorderX('37.8%')
    }
    else{
      setBorderX('68.9%')
    }
    console.log('created default values', defaultValueObj)
    setDefaultValue(defaultValueObj)
  }
  async function getUser(){
    const { attributes } = await Auth.currentAuthenticatedUser();
    setEmail(attributes.email)
  }

  function onSubmit(data){
    data.style = selectedStyle
    console.log('submitting with data:', data)
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
      currentCard.style = data.style
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
    navigation.navigate('informationEditScreen',{email:email,card:cardId})
  }
  if (loading){
    return (
      <Text>loading</Text>
    )
  }
  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '5%'}]}>Edit Layout</Text>
      <TouchableOpacity style = {[styles.touchable, {left: '5%'}]} onPress={cancel}>
        <Text style = {[styles.text, {top: '4.5%'}, {fontSize: 15}]}>Back</Text>
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
      <View style={[styles.styleContainer,{top:'32%'}]}>
        <TouchableOpacity onPress={()=>{setSelectedStyle(1); setBorderX('6.8%');}}>
          <Style1/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setSelectedStyle(2); setBorderX('37.8%')}}>
          <Style2/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setSelectedStyle(3); setBorderX('68.9%')}}>
          <Style3/>
        </TouchableOpacity>
        <View style = {[styles.border, {left: borderX}]}/>
      </View>
      <View style = {styles.cardWrapper}>
        {card}
      </View>
      <StatusBar
        barStyle = "light-content"
        backgroundColor = '#000'/>
    </LinearGradient>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  cardWrapper:{
    position: 'absolute',
    top:'40%',
    width: '100%',
  },
  cards:{
  },
  border:{//6.8, 37.8,68.9
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 80,
    height: 80,
    borderRadius:10,
    borderWidth: 3,
    borderColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
  styleContainer:{
    width: '80%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
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
