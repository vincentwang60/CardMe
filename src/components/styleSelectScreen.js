import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { listUsers, getUser } from '../graphql/queries.js';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Button from './shared/button.js'
import Card1 from './shared/card1.js'

export default function homeScreen( {navigation }) {
  const [userData, setUserData] = useState([]);
  const pressHandler = () => {
    navigation.navigate('homeScreen')
  }

  useEffect(()=>{
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
    <View style={styles.container}>
      <Text style = {[styles.text]}>Card placeholder</Text>
      <Card1 data={userData} />
      <Button label='Continue' onPress = {pressHandler} />
      <StatusBar
        barStyle = "light-content"
        backgroundColor = '#000'/>
    </View>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#325F71',
    padding:8,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
  },
});
