import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, Button, View, StatusBar, TouchableOpacity } from 'react-native';
import { listUsers } from '../graphql/queries.js';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

export default function homeScreen( {navigation }) {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    fetchUsers();
  },[]);
  const fetchUsers = async () => {
    try{
      const userData = await API.graphql(graphqlOperation(listUsers))
      const userList = userData.data.listUsers.items;
      console.log('user list', userList);
      setUsers(userList)
    }
    catch (error) {
      console.log('error on fetchUsers', error);
    }
  };
  const pressHandler = () => {
    navigation.navigate('styleSelectScreen')
  }
  return (
    <View style={styles.container}>
      <Text style = {[styles.welcomeText]}>Quick brown fox jumps over{"\n"}the lazy dog!</Text>
      <TouchableOpacity onPress={pressHandler}>
         <Text style = {[styles.buttonText]}>
             Button
         </Text>
      </TouchableOpacity >
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter_300Light',
    flex:0.15
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#AACCDA',
    fontSize: 20,
    color: 'black',
    fontFamily: 'Inter_600SemiBold',
  }
});
