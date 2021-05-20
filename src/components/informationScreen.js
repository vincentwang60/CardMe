import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import { listUsers } from '../graphql/queries.js';
import * as mutations from '../graphql/mutations.js';
import Input from './shared/input.js';
import Button from './shared/button.js';

export default function informationScreen( {route, navigation }) {
  const {email} = route.params;
  const { handleSubmit, control, formState: {errors} } = useForm();

  function onSubmit(data){
    data.id = email;
    console.log('data', data)
    setInformation(data)
  }
  const skip = () => {
    navigation.navigate('styleSelectScreen', {email: email})
  }
  async function setInformation(data){
    console.log('made it!', data)
    try{
      await API.graphql({ query: mutations.createUser, variables: {input: data}});
      navigation.navigate('styleSelectScreen', {email: email})
    }
    catch (error){
      console.log('error on setInformation', error);
    }
  }

  return (
    <LinearGradient colors={['#fff','#F4F4F4']} style={styles.container}>
      <Controller
        name='name'
        control={control}
        rules={{
          required: {value: true, message: 'Please enter your name'},
        }}
        render={({field: {onChange, value}})=>(
          <Input
            error={errors.name}
            containerStyle={[styles.input, { top: '29.0%'}]}
            label="Name"
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
      />
      <Controller
        name='nickname'
        control={control}
        rules={{
          //
        }}
        render={({field: {onChange, value}})=>(
          <Input
            error={errors.nickname}
            containerStyle={[styles.input, { top: '39.0%'}]}
            label="Nickname"
            onChangeText={(text) => onChange(text)}
          />
        )}
      />
      <Button
        containerStyle={[styles.input, { top: '69.0%'}]}
        label="Set information"
        onPress={handleSubmit(onSubmit)}
      />
      <Button
        containerStyle={[styles.input, { top: '79.0%'}]}
        label="Skip"
        onPress={skip}
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
    justifyContent: 'center',
    flex: 1,
  },
  input:{
    position: 'absolute',
    left: "6.2%",
  },
});
