import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, Button, View, StatusBar, TouchableOpacity } from 'react-native';
import { listUsers } from '../graphql/queries.js';
import * as mutations from '../graphql/mutations.js';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

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
      <TextInput
        label="Name"
        placeholder="Set name!"
        onChangeText={(text) => setFormData({...formData, name: text})}
        style={styles.welcomeText}
      />
      <TextInput
        label="Nickname"
        placeholder="Set nickname"
        onChangeText={(text) => setFormData({...formData, nickname: text})}
        style={styles.welcomeText}
      />
      <TouchableOpacity onPress={setInformation}>
         <Text style = {[styles.buttonText]}>
             Set information
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
