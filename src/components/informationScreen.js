import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar } from 'react-native';
import { listUsers } from '../graphql/queries.js';
import * as mutations from '../graphql/mutations.js';

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
    <View style={styles.container}>
      <Input label="Name"  onChangeText={(text) => setFormData({...formData, name: text})} />
      <Input label="Nickname"  onChangeText={(text) => setFormData({...formData, nickname: text})} />
      <Button label="SET INFORMATION" onPress={setInformation} />
      <Button label="skip delete me" onPress={skip} />
      <StatusBar
        barStyle = "light-content"
        backgroundColor = '#000'/>
    </View>
  );
}

//https://reactnative.dev/docs/style
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#325F71',
    justifyContent: 'center',
    flex:1,
    padding:8,
  },
});
