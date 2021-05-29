import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { v4 as uuidv4 } from 'uuid';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Button from './shared/button.js'
import Card1 from './shared/card1.js'
import { listUsers, getUser } from '../graphql/queries.js';
import { updateUser } from '../graphql/mutations.js';

export default function libraryScreen( {route, navigation }) {
  const {email} = route.params;
  const [userData, setUserData] = useState([]);

  useEffect(()=>{//runs once every time this screen is loaded
    //fetchUserData();
  },[]);

  const toHome = () => {
    navigation.navigate('homeScreen')
  }
  const createCard = async() => {
    console.log('library screen creating card')
    const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
    const user = fetchedUserData.data.listUsers.items[0]
    const newContent = {id: uuidv4(), name: 'New content name', data: 'New data name'}
    const newOwnedCard = { id: uuidv4(), title: 'New card title!!', content: newContent}
    const newUpdateUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      cardsCreated: user.cardsCreated ? [...user.cardsCreated, newOwnedCard]: [newOwnedCard]
    }
    const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
    console.log('library screen successfully created card')
  }
  const fetchUserData = async () => {//will fetch all users from dynamodb
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      console.log('fetched user data:', fetchedUserData.data.listUsers.items[0]);
      setUserData(fetchedUserData.data.listUsers.items[0]);
    }
    catch (error) {
      console.log('Error on fetchUserData', error);
    }
  };
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '10%'}]}>Library screen{'\n'}placeholder</Text>
      <Button
        containerStyle={[styles.items, { top: '59.0%'}]}
        label='Create Empty Card'
        onPress = {createCard}
      />
      <Button
        containerStyle={[styles.items, { top: '69.0%'}]}
        label='Fetch user data'
        onPress = {fetchUserData}
      />
      <Button
        containerStyle={[styles.items, { top: '79.0%'}]}
        label='Go to home screen'
        onPress = {toHome}
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
  items:{
    position: 'absolute',
    left: "6.2%",
  }
});
