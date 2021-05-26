import React from 'react';
import  AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_300Light,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Docs for react navigation: https://reactnavigation.org/docs/stack-navigator/

//Screens for app
import signUpScreen from './src/components/signUpScreen';
import logInScreen from './src/components/logInScreen';
import verificationScreen from './src/components/verificationScreen';
import homeScreen from './src/components/homeScreen';
import informationScreen from './src/components/informationScreen';
import libraryScreen from './src/components/libraryScreen';
import styleSelectScreen from './src/components/styleSelectScreen';
import forgotPasswordScreen from './src/components/forgotPasswordScreen';
import verificationCodeForgotPassword from './src/components/verificationCodeForgotPassword';

const Stack = createStackNavigator(); //Stack object that contains all the screens

function MyStack() {//creates and configures stack object
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}
    >
      {/*Tells stack how to access the screens and assigns names*/}
      <Stack.Screen name="signUpScreen" component={signUpScreen} />
      <Stack.Screen name="logInScreen" component={logInScreen} />
      <Stack.Screen name="verificationScreen" component={verificationScreen} />
      <Stack.Screen name="homeScreen" component={homeScreen} />
      <Stack.Screen name="informationScreen" component={informationScreen} />
      <Stack.Screen name="libraryScreen" component={libraryScreen} />
      <Stack.Screen name="styleSelectScreen" component={styleSelectScreen} />
      <Stack.Screen name="forgotPasswordScreen" component={forgotPasswordScreen} />
      <Stack.Screen name="verificationCodeForgotPassword" component={verificationCodeForgotPassword} />
    </Stack.Navigator>
  );
}
export default function App() {
  //Load fonts
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
  });
  if (!fontsLoaded){
    return <AppLoading />;
  }
  else{

    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}
