import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from "@react-navigation/native";

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Button from './shared/button.js'
import Card1 from './shared/card1.js'
import { listUsers, getUser } from '../graphql/queries.js';
import { updateUser } from '../graphql/mutations.js';

export default function libraryScreen( {route, navigation }) {
  const [email, setEmail] = useState();
  const isFocused = useIsFocused(); //used to make sure useEffect is called even when component already loaded
  const [cardData, setCardData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{//runs once every time this screen is loaded
    if(isFocused){
      getUser()
    }
  },[isFocused]);

  useEffect(()=>{//runs when email is changed
    if(email != null){
      fetchUserData()
    }
  },[email])

  useEffect(()=>{//runs when card data is changed
    if (cardData != null){
      setLoading(false)
    }
  },[cardData])

  async function getUser(){
    const { attributes } = await Auth.currentAuthenticatedUser();
    setEmail(attributes.email)
  }

  const createCardData = async(savedCards) => {//sets up cardData based on the ids of the cards being fetched
    console.log('lib screen creating card data')
    var tempCardData = [] //temp array that card data is set to once completed
    for (var i =0; i< savedCards.length; i++){
      const creatorID = savedCards[i].creatorID
      const cardId = savedCards[i].cardId
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {id: {eq: creatorID}}}))
      const cardsCreated = fetchedUserData.data.listUsers.items[0].cardsCreated
      const currentCardIndex = cardsCreated.findIndex(x => x.id === cardId)//get the index of current card from the cardsCreated array
      tempCardData.push(cardsCreated[currentCardIndex])
    }
    setCardData(tempCardData)
  }

  const fetchUserData = async () => {//will fetch all users from dynamodb
    console.log('lib screen fetching user data')
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      const savedCards = fetchedUserData.data.listUsers.items[0].savedCards
      console.log('lib screens fetched saved cards:', savedCards);
      if(savedCards === null){
        console.log('no saved cards')
        setLoading(false)
      }
      else{
        createCardData(savedCards)
      }
    }
    catch (error) {
      console.log('lib screen error on fetchUserData', error);
    }
  };
  if (loading){
    return(
      <Text>loading</Text>
    )
  }
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '5%'}]}>Library screen{'\n'}placeholder</Text>
      <Text style = {[styles.text, {top: '8%'}]}>Saved cards:</Text>
      {/*<Card1
        containerStyle={[styles.items, { top: '22.0%'}, {left: "10%"}]}
        data={cardData[0]}
      />*/}
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
  items:{
    position: 'absolute',
    left: "6.2%",
  }
});
