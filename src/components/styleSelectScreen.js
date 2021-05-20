import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { listUsers, getUser } from '../graphql/queries.js';
import {LinearGradient} from 'expo-linear-gradient';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Button from './shared/button.js'
import Card1 from './shared/card1.js'

export default function homeScreen( {navigation }) {
  const [userData, setUserData] = useState([]);
  const pressHandler = () => {
    navigation.navigate('homeScreen')
  }

  useEffect(()=>{//runs once every time this screen is loaded
    fetchUserData();
  },[]);

  const fetchUserData = async () => {//will fetch all users from dynamodb
    try{
      const currentUserInfo = await Auth.currentUserInfo();
      const fetchedUserData = await API.graphql(graphqlOperation(getUser, {id: currentUserInfo.attributes.email}))
      //console.log('userdata', fetchedUserData.data.getUser);
      setUserData(fetchedUserData.data.getUser);
    }
    catch (error) {
      console.log('Error on fetchUserData', error);
    }
  };
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '10%'}]}>Card placeholder</Text>
      <Card1 containerStyle={[styles.items, { top: '29.0%'}, {left: "10%"}]} data={userData} />
      <Button containerStyle={[styles.items, { top: '79.0%'}]} label='Continue' onPress = {pressHandler} />
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
