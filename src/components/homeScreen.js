import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Button from './shared/button.js'
import Card1 from './shared/card1.js'
import { listUsers, getUser } from '../graphql/queries.js';

export default function homeScreen( {route, navigation }) {
  const {email} = route.params;
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{//runs once every time this screen is loaded
    fetchUserData();
  },[]);

  const toLibrary = () => {
    navigation.navigate('libraryScreen', {email: email})
  }
  const toEdit = () => {
    navigation.navigate('informationEditScreen', {email: email})
  }
  const fetchUserData = async () => {//will fetch card to display for logged in user from dynamodb
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(getUser, {id: email}))
      setUserData(fetchedUserData.data.getUser);
      console.log('loaded cards:', fetchedUserData.data.getUser.cardsCreated)
      setLoading(false)
    }
    catch (error) {
      console.log('Error on fetchUserData', error);
    }
  };

  if (loading){
    return(
      <Text>loading</Text>
    )
  }
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '10%'}]}>Home screen{'\n'}placeholder</Text>
      <Card1
        containerStyle={[styles.items, { top: '29.0%'}, {left: "10%"}]}
        data={userData.cardsCreated[0]}
      />
      <Button
        containerStyle={[styles.items, { top: '79.0%'}]}
        label='Go to library'
        onPress = {toLibrary}
      />
      <Button
        containerStyle={[styles.items, { top: '86.0%'}]}
        label='Go to edit screen'
        onPress = {toEdit}
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
