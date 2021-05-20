import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar } from 'react-native';
import { listUsers } from '../graphql/queries.js';
import * as mutations from '../graphql/mutations.js';
import {LinearGradient} from 'expo-linear-gradient';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import Input from './shared/input.js';
import Button from './shared/button.js';

const initialFormState = {
  id: '',
  name: '',
  nickname: ''
}

export default function homeScreen( {navigation }) {
  const currentUserEmail = ''
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(()=>{
    getUserEmail();
    //fetchUsers();
  },[]);

  const getUserEmail = async () => {
    const currentUserInfo = await Auth.currentUserInfo();
    setFormData({...formData, id: currentUserInfo.attributes.email});
  }
  const skip = () => {
    navigation.navigate('styleSelectScreen')
  }
  /*const fetchUsers = async () => {//will fetch all users from dynamodb
    try{
      const userData = await API.graphql(graphqlOperation(listUsers))
      const userList = userData.data.listUsers.items;
      //console.log('user list', userList);
      setUsers(userList)
    }
    catch (error) {
      console.log('error on fetchUsers', error);
    }
  };*/
  const setInformation = async () => {
    if (!formData.name || !formData.nickname){
      console.log('fields are empty!', initialFormState);
      return;
    }
    try{
      console.log('formData:', formData);
      await API.graphql({ query: mutations.createUser, variables: {input: formData}});
      setUsers([...users, formData]);
      setFormData(initialFormState);
      navigation.navigate('styleSelectScreen')
    }
    catch (error){
      console.log('error on setInformation', error);
    }
  }

  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Input containerStyle={[styles.input, { top: '29.0%'}]} label="Name"  onChangeText={(text) => setFormData({...formData, name: text})} />
      <Input containerStyle={[styles.input, { top: '39.0%'}]} label="Nickname"  onChangeText={(text) => setFormData({...formData, nickname: text})} />
      <Button containerStyle={[styles.input, { top: '69.0%'}]} label="Set information" onPress={setInformation} />
      <Button containerStyle={[styles.input, { top: '79.0%'}]} label="Skip" onPress={skip} />
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
    justifyContent: 'center',
    flex: 1,
  },
  input:{
    position: 'absolute',
    left: "6.2%",
  },
});
