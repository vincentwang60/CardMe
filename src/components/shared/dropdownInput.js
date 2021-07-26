import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

export default function FieldInput({
  containerStyle,
})
{
  return (
      <View style={[containerStyle,{width:Dimensions.get('window').width*.85}]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>{console.log('hey there')}} style={styles.dropdown}>
            <Text style={styles.label}> hey</Text>
          </TouchableOpacity>
          <Text style={styles.label}>hey</Text>
        </View>
      </View>
  );
}



const styles = StyleSheet.create({
  dropdown:{
    width:'50%',
    backgroundColor: 'lightgray',
    padding:'1%'
  },
  label: {
    paddingVertical: 0,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
});
