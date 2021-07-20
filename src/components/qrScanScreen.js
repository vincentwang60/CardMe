import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { v4 as uuidv4 } from 'uuid';

import Amplify, {Auth, API, graphqlOperation} from "aws-amplify";

import { listUsers, getUser } from '../graphql/queries.js';
import { updateUser, createUser } from '../graphql/mutations.js';

export default function qrScanScreen( {route, navigation }) {
  const {email} = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async({ type, data }) => {
    if (scanned){
      console.log('already scanned!')
    }
    else{
      setScanned(true);
      console.log('Scanned data:',data)
      const creatorID = data.substr(0,36)
      const cardId = data.substr(36,63)
      console.log('creatorID:',creatorID, 'cardId', cardId)
      const fetchedUserData = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}}}))
      const user = fetchedUserData.data.listUsers.items[0]
      console.log('qr scan fetched data:', user)

      var newSavedCards = []
      if (user.savedCards === null){//if target user has no saved cards
        console.log('no saved cards')
        newSavedCards.push({id: uuidv4(), creatorID: creatorID, cardId: cardId})
      }
      else{
        console.log('saved cards:', user.savedCards)
        user.savedCards.push({id: uuidv4(), creatorID: creatorID, cardId: cardId})
        newSavedCards = user.savedCards
      }
      console.log('created newSavedCards:', newSavedCards)
      const newUpdateUser = {
        id: user.id,
        email: user.email,
        cardsCreated: user.cardsCreated,
        savedCards: newSavedCards
      }
      const output = await API.graphql(graphqlOperation(updateUser, {input: newUpdateUser}))
      console.log('qr scan updated target user:', newUpdateUser)

      navigation.navigate('homeTabs')
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
     <Text style = {[styles.text, {top: '1%'}]}>Scanning for QR codes</Text>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
    fontFamily: 'Inter_600SemiBold',
  },
});
