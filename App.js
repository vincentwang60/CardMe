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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Docs for react navigation: https://reactnavigation.org/docs/stack-navigator/

//Screens for app
import signUpScreen from './src/components/signUpScreen';
import logInScreen from './src/components/logInScreen';
import verificationScreen from './src/components/verificationScreen';
import homeScreen from './src/components/homeScreen';
import informationEditScreen from './src/components/informationEditScreen';
import layoutEditScreen from './src/components/layoutEditScreen';
import libraryScreen from './src/components/libraryScreen';
import forgotPasswordScreen from './src/components/forgotPasswordScreen';
import verificationCodeForgotPassword from './src/components/verificationCodeForgotPassword';
import qrScanScreen from './src/components/qrScanScreen';

const Stack = createStackNavigator(); //Stack object that contains all the screens
const Tab = createBottomTabNavigator();

function editScreen() { //create tab navigation object that contains the two edit screens
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name = 'informationEditScreen' component = {informationEditScreen}/>
      <Tab.Screen name = 'layoutEditScreen' component = {layoutEditScreen}/>
    </Tab.Navigator>
  )
}
function homeTabs() { //create tab navigation object that contains the two edit screens
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name = 'homeScreen' component = {homeScreen}/>
      <Tab.Screen name = 'libraryScreen' component = {libraryScreen}/>
    </Tab.Navigator>
  )
}

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
      <Stack.Screen name="editScreen" component={editScreen} />
      <Stack.Screen name="homeTabs" component={homeTabs} />
      <Stack.Screen name="forgotPasswordScreen" component={forgotPasswordScreen} />
      <Stack.Screen name="verificationCodeForgotPassword" component={verificationCodeForgotPassword} />
      <Stack.Screen name="qrScanScreen" component={qrScanScreen} />
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
