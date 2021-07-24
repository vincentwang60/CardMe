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
import{
  Montserrat_500Medium,
  Montserrat_300Light
} from '@expo-google-fonts/montserrat'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

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
import settingsScreen from './src/components/settingsScreen';
import groupScreen from './src/components/groupScreen'

const Stack = createStackNavigator(); //Stack object that contains all the screens
const Tab = createBottomTabNavigator();

function homeTabs() { //create tab navigation object that contains the two edit screens
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({color}) => {
            if (route.name === 'homeScreen') {
              return <Ionicons name='home' size={24} color={color} />;
            } else if (route.name === 'libraryScreen') {
              return <MaterialIcons name="menu-book" size={24} color={color} />
            } else if(route.name === 'settingsScreen'){
              return <Octicons name="settings" size={24} color={color} />
            }
            else if(route.name === 'groupScreen'){
              return <MaterialCommunityIcons name="account-group-outline" size={24} color={color} />
            }
          },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#00ADE9',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name = 'homeScreen' component = {homeScreen}/>
      <Tab.Screen name = 'libraryScreen' component = {libraryScreen}/>
      <Tab.Screen name = 'settingsScreen' component = {settingsScreen} />
      <Tab.Screen name = 'groupScreen' component = {groupScreen} />
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
      <Stack.Screen name="layoutEditScreen" component={layoutEditScreen} />
      <Stack.Screen name="informationEditScreen" component={informationEditScreen} />
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
    Montserrat_500Medium,
    Montserrat_300Light,
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
