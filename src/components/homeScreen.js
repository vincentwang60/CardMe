import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useIsFocused } from "@react-navigation/native";

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Button from './shared/button.js'
import Card1 from './shared/card1.js'
import { listUsers, getUser } from '../graphql/queries.js';

export default function homeScreen( {route, navigation }) {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true)
  const isFocused = useIsFocused(); //used to make sure useEffect is called even when component already loaded, DONT COPY THIS IS SPECIAL CASE
  const [email, setEmail] = useState();

  useEffect(()=>{//runs once every time this screen is loaded
    if(isFocused){
      getUser()
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
  const fetchUserData = async () => {//will fetch card to display for logged in user from dynamodb
    console.log('home screen fetching user')
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      const user = fetchedUserData.data.listUsers.items[0]
      setUserData(user);
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
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '10%'}]}>Home screen{'\n'}placeholder</Text>
      <Card1
        containerStyle={[styles.items, { top: '29.0%'}, {left: "10%"}]}
        data={userData.cardsCreated[0]}
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
