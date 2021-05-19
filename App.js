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

import signUpScreen from './src/components/signUpScreen';
import homeScreen from './src/components/homeScreen';
import informationScreen from './src/components/informationScreen';
import libraryScreen from './src/components/libraryScreen';
import styleSelectScreen from './src/components/styleSelectScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
        /*headerStyle: {//shows header, useful to keep track of what screen you're on
          backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Inter_600SemiBold',
        },*/
      }}
    >
      <Stack.Screen name="signUpScreen" component={signUpScreen} />
      <Stack.Screen name="homeScreen" component={homeScreen} />
      <Stack.Screen name="informationScreen" component={informationScreen} />
      <Stack.Screen name="libraryScreen" component={libraryScreen} />
      <Stack.Screen name="styleSelectScreen" component={styleSelectScreen} />
    </Stack.Navigator>
  );
}
export default function App() {
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
