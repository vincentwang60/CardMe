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

  useEffect(()=>{//runs once every time this screen is loaded
    fetchUserData();
  },[]);

  const toLibrary = () => {
    navigation.navigate('libraryScreen', {email: email})
  }
  const fetchUserData = async () => {//will fetch all users from dynamodb
    try{
      const fetchedUserData = await API.graphql(graphqlOperation(getUser, {id: email}))
      console.log('fetched user data:', fetchedUserData.data.getUser);
      setUserData(fetchedUserData.data.getUser);
    }
    catch (error) {
      console.log('Error on fetchUserData', error);
    }
  };
  return (
   <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Text style = {[styles.text, {top: '10%'}]}>Home screen{'\n'}placeholder</Text>
      <Card1
        containerStyle={[styles.items, { top: '29.0%'}, {left: "10%"}]}
        data={userData}
      />
      <Button
        containerStyle={[styles.items, { top: '79.0%'}]}
        label='Go to library'
        onPress = {toLibrary}
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
