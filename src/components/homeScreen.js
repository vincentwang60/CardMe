import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, Dimensions, SafeAreaView, Animated, TouchableOpacity, FlatList } from 'react-native';
import {
  diffClamp,
  onScrollEvent,
  usePanGestureHandler,
  withDecay,
} from "react-native-redash";
import { PanGestureHandler } from "react-native-gesture-handler";
import {LinearGradient} from 'expo-linear-gradient';
import { useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Entypo  } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
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
  const [QRCodeComponent,setQRCodeComponent] = useState()
  const [cardArray, setCardArray] = useState([])
  const [cardFocused, setCardFocused] = useState()
  const scrollY = useRef(new Animated.Value(0)).current
  const {height} = Dimensions.get('window').height

  useEffect(()=>{//runs once every time this screen is loaded
    console.log('home screen is focused')
    setLoading(true)
    setCardFocused(null)
    if(isFocused){
      getUser()
      if(email != null){//refresh userdata even if email isn't changed
        fetchUserData()
      }
    }
  },[isFocused]);
  useEffect(()=>{//called when userData is changed
    if(userData != null){
      console.log('successfully fetched userData')
      if (userData.cardsCreated != null){
        if (userData.cardsCreated[0].content != null){
          console.log('hs userdata eff creating qr code')
          createQRCodeComponent()
          console.log('hs userdata eff creating card array')
          var tempCardArray = []
          for (let i = 0; i < userData.cardsCreated.length; i++){
            const newCard =
              <TouchableOpacity style = {styles.cards,{padding: 2}} onPress={()=>{
                setCardFocused(i)
              }} key={i} activeOpacity = {1}>
                <Card1
                  containerStyle = {styles.cards}
                  data={userData.cardsCreated[i]}
                />
              </TouchableOpacity>
            console.log('created new card:',userData.cardsCreated[i].title)
            tempCardArray.push(newCard)
          }
          setCardArray(tempCardArray)
        }
      }
      setLoading(false)
    }
  }, [userData])
  useEffect(()=>{//called when email is changed
    if(email != null){
      fetchUserData()
    }
  }, [email])


  const createQRCodeComponent = () => {
    const stringExp = String(userData.id)+String(userData.cardsCreated[0].id)
    console.log('home screen creating qr code component',stringExp)
    setQRCodeComponent(
      <View style = {[styles.QRCodeComponentStyle]}>
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
    )
  }
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
  function toEdit(){
    console.log('navigating to edit screen with params:',email,null)
    navigation.navigate('informationEditScreen', {email: email, card: null})
    //TODO FIX CARDID
  }
  const qrScan = () => {
    console.log('starting qr scan')
    navigation.navigate('qrScanScreen',{email: email})
  }
  const createQR = () => {
    setShowQR(true)
  }
  const deleteCard = async(focusedCard) => {
    const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
    const user = fetchedUserData.data.listUsers.items[0]
    if(user.cardsCreated.length == 1){
      user.cardsCreated = null
      setNoCards(true)
    }
    else{
      const currentCardIndex = user.cardsCreated.findIndex(x => x.id === focusedCard.id)
      user.cardsCreated.splice(currentCardIndex,1)
    }
    const newUpdateUser = {
      id: user.id,
      email: user.email,
      cardsCreated: user.cardsCreated,
      savedCards: user.savedCards
    }
    const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
    console.log('successfully wiped single card')
    setLoading(true)
    setCardFocused(null)
    fetchUserData()
  }
  const deleteAllCards = async() => {
    const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
    const user = fetchedUserData.data.listUsers.items[0]
    const newUpdateUser = {
      id: user.id,
      email: user.email,
      cardsCreated: null,
      savedCards: user.savedCards
    }
    const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
    console.log('successfully wiped cards created')
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
        if (user.cardsCreated != null && user.cardsCreated != []){
          if (user.cardsCreated[0].content != null){
            setNoCards(false)
          }
          else{
            console.log('content is null')
          }
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
      <LinearGradient colors={['#fff','#F4F4F4']} style={[styles.container, {justifyContent: 'center'}]}>
        <Text style = {styles.myCardsText}>My cards</Text>
        <TouchableOpacity style = {styles.icon} onPress={toEdit}>
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
        <Text style = {[styles.grayText, {paddingVertical: 10}]}>Let's get started by {'\n'}adding your first card!</Text>
        <View style = {{alignItems: 'center'}}>
          <Button
            buttonStyle = {styles.button}
            label='Add card +'
            onPress = {toEdit}
            colors = {['#00ADE9','#E6014E']}
          />
        </View>
        <StatusBar
          barStyle = "dark-content"
          backgroundColor = '#fff'/>
       </LinearGradient>
    )
  }
  if (cardFocused != null){
    let focusedCard = cardArray[cardFocused].props.children.props.data
    let newCard =
        <Card1
          containerStyle = {styles.cards}
          data={cardArray[cardFocused].props.children.props.data}
          focused = {true}
        />
    console.log('card title', focusedCard.title)
    return(
      <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
        <Text style = {styles.myCardsText}>My cards</Text>
        <TouchableOpacity style = {styles.icon} onPress={toEdit}>
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style = {{position: 'absolute', width:'100%',height:'100%'}} onPress={()=>{setCardFocused(null)}}>
          <View style={{}}/>
        </TouchableOpacity>
        <View style = {{position:'relative',top:'15%'}}>
          <Text style = {[styles.myCardsText,{fontSize:15,position:'relative',top:'-5%',left:'8%'}]}>{focusedCard.title} </Text>
          {newCard}
          <View style = {{flexDirection: 'row',left: '120%'}}>
            <TouchableOpacity onPress={()=>{
              console.log('navigating to edit screen with params:',email,focusedCard.id)
              navigation.navigate('informationEditScreen', {email: email, card: focusedCard.id})
            }}>
              <Feather name="edit"size={24} style = {{marginHorizontal: 10, marginVertical: 10}} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              deleteCard(focusedCard)
            }}>
              <AntDesign name="delete" size={24} style = {{marginVertical: 10}} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style = {[styles.myCardsText,{top:'70%',fontSize:10}]}>Debug shit, ignore</Text>

        <Button
          containerStyle={[styles.items, { top: '82.0%'}]}
          label="Share"
          onPress={handleSubmit(onSubmit)}
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
              containerStyle={[styles.input, { top: '73%'}]}
              label="Share via email"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <Button
          containerStyle={[styles.items, { top: '87.0%'}]}
          label='Share via QR code'
          onPress = {createQR}
        />
        <Button
          containerStyle={[styles.items, { top: '92.0%'}]}
          label='QR code test'
          onPress = {qrScan}
        />
        <StatusBar
          barStyle = "dark-content"
          backgroundColor = '#fff'/>
       </LinearGradient>
    );
  }
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={[styles.container, {justifyContent: 'flex-start'}]}>
     <Text style = {styles.myCardsText}>My cards</Text>
     <TouchableOpacity style = {styles.icon} onPress={toEdit}>
       <Entypo name="plus" size={24} color="black" />
     </TouchableOpacity>
    <SafeAreaView style={{flex:1,margin:16}}>
      <View style={{flex:1,top:'10%'}}>
        <Animated.ScrollView
          scrollEventThrottle={50}
          showsVerticalScrollIndicator = {true}
          contentContainerStyle={{height: Dimensions.get('window').height*.9+400}}
          onScroll={
            Animated.event([{nativeEvent:{contentOffset:{y:scrollY}}}],{useNativeDriver:true})
          }
        >
        {cardArray.map((card,cardIndex)=>{
          const cardHeight = Dimensions.get('window').width*.4
          let inputRange,outputRange
          if(cardIndex == 0){
            inputRange = [0,400]
            outputRange = [0,400]
          }
          else{
            inputRange = [0,400*(cardIndex/cardArray.length),400]
            outputRange = [0,0.5*cardHeight*-cardIndex+400*(cardIndex/cardArray.length),400-(cardHeight-20)*cardIndex]
          }
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange,
            extrapolateRight: "clamp"
          });
          return(
            <Animated.View key={cardIndex} style={{transform: [{translateY}]}}>
              {card}
            </Animated.View>
          )
        })}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
    </LinearGradient>
  )
}/*
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={[styles.container, {justifyContent: 'flex-start'}]}>
     <Text style = {styles.myCardsText}>My cards</Text>
     <TouchableOpacity style = {styles.icon} onPress={toEdit}>
       <Entypo name="plus" size={24} color="black" />
     </TouchableOpacity>
     <View style = {{top:'10%',height: '60%'}}>
       <ScrollView style = {styles.cardArray}>
          {cardArray}
       </ScrollView>
     </View>
     <Text style = {[styles.myCardsText,{top:'83%',fontSize:10}]}>Debug shit, ignore</Text>
     <Button
       containerStyle={[styles.items, { top: '85.0%'}]}
       label='Delete cards created'
       onPress = {deleteAllCards}
     />
    {showQR && QRCodeComponent}
      <StatusBar
        barStyle = "dark-content"
        backgroundColor = '#fff'/>
    </LinearGradient>
  );
}*/
//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  cardArray:{
    top: '10%',
  },
  cards:{

  },
  touchable:{
    top:'-100%',
    left: '15%',
  },
  QRCodeComponentStyle:{
    alignItems: 'center',
    top:'15%',
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  icon: {
    position: 'absolute',
    left: '90%',
    top: '4.5%',
  },
  button: {
    width: Dimensions.get('window').width*.52,
    borderRadius: 5,
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
    left: '10%',
    fontSize: 20,
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
    borderRadius: 5,
  },
  input:{
    position: 'absolute',
    left: "6.2%",
    borderRadius: 5,
  },
});
