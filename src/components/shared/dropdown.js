import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { TextInput, ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

export default function Dropdown(props)
{
  //console.log('dropdown',value,selected)
  const [selectedString,setSelectedString] = useState(props.selected)
  const [showOptions, setShowOptions] = useState(false)

  let options = []
  for (let i = 0; i < props.optionStrings.length; i++){
    const newText =
      <TouchableOpacity key={i} onPress={()=>{
        setShowOptions(false);
        props.setSelected(props.optionStrings[i]);
        setSelectedString(props.optionStrings[i]);
      }}>
        <Text style = {[styles.label,{marginBottom: 10}]}>{props.optionStrings[i]}</Text>
      </TouchableOpacity>
    options.push(newText)
  }
  if(showOptions){
    return(
        <View style={[props.containerStyle,{width:Dimensions.get('window').width*.85}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width:'35%', padding: '2%'}}>
              <View style={styles.dropdown}>
                <Text style={styles.label}>{selectedString}</Text>
              </View>
            </View>
            <TextInput
              placeholder='Placeholder for a placeholder'
              autoCapitalize="none"
              style={styles.input}
              onChangeText= {props.onChangeText}
              value={props.value}
            />
          </View>
          <View style = {styles.dropdownWrapper}>
            <ScrollView nestedScrollEnabled = {true} style={styles.dropdownOptions}>
              {options}
            </ScrollView>
          </View>
        </View>
    )
  }
  return (
      <View style={[props.containerStyle,{flexDirection: 'row',width:Dimensions.get('window').width*.85}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width:'35%',padding: '2%'}}>
            <TouchableOpacity onPress={()=>{setShowOptions(!showOptions)}} style={styles.dropdown}>
              <Text style={styles.label}>{selectedString}</Text>
              <AntDesign style={{position: 'absolute',left:'83%',top:'18%',}}name="down" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='Placeholder for a placeholder'
            autoCapitalize="none"
            style={[styles.input,{}]}
            onChangeText= {props.onChangeText}
            value={props.value}
          />
        </View>
      </View>
  );
}



const styles = StyleSheet.create({
  dropdownWrapper:{
    position:'absolute',
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'lightgray',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height:'350%',
    width:'35%',
    left:-1,
  },
  dropdownOptions:{
    width:'100%',
    position: 'absolute',
    height:'100%',
    padding:'10%',
  },
  dropdown:{
    padding:'3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    paddingVertical: 0,
    fontSize: 15,
    color: '#000',
    fontFamily: 'Nunito_700Bold',
  },
  input: {
    paddingVertical: 6,
    paddingLeft: 5,
    fontSize: 14,
    width:'65%',
    color: '#000',
    fontFamily: 'Nunito_400Regular',
    position: 'relative'
  },
});
