import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';
import { TouchableOpacity, ScrollView} from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

export default function FieldInput({
  optionStrings,
  containerStyle,
  returnChange = ()=>{console.log('wtf')},
  secure = false,
  inputStyle = styles.input,
  value,
  selected,
})
{
  let setSelected = selected
  if (setSelected == null){
    setSelected = 'email'
  }
  const [showOptions, setShowOptions] = useState(false)
  const [selectedString, setSelectedString] = useState(setSelected)
  const [output,setOutput] = useState('testing dropdown')
  let options = []
  for (let i = 0; i < optionStrings.length; i++){
    const newText =
      <TouchableOpacity key={i} onPress={()=>{
        setSelectedString(optionStrings[i]);
        setShowOptions(false);}}>
        <Text style = {[styles.label,{marginBottom: 10}]}>{optionStrings[i]}</Text>
      </TouchableOpacity>
    options.push(newText)
  }
  useEffect(()=>{
    if(output != null){
      returnChange(output)
    }
  },[output])
  if(showOptions){
    return(
        <View style={[containerStyle,{width:Dimensions.get('window').width*.85}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width:'35%', padding: 8}}>
              <TouchableOpacity onPress={()=>{setShowOptions(!showOptions)}} style={styles.dropdown}>
                <Text style={styles.label}>{selectedString}</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder='Placeholder for a placeholder'
              autoCapitalize="none"
              secureTextEntry = {secure}
              style={styles.input}
              onChangeText= {(text)=>{setOutput(text);}}
              value = {value}
            />
          </View>
          <View style = {styles.dropdownWrapper}>
            <ScrollView style={styles.dropdownOptions}>
              {options}
            </ScrollView>
          </View>
        </View>
    )
  }
  return (
      <View style={[containerStyle,{width:Dimensions.get('window').width*.85}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width:'35%',padding: 8}}>
            <TouchableOpacity onPress={()=>{setShowOptions(!showOptions)}} style={styles.dropdown}>
              <Text style={styles.label}>{selectedString}</Text>
              <AntDesign style= {{top:'3%'}}name="down" size={18} color="lightgray" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='Placeholder for a placeholder'
            autoCapitalize="none"
            secureTextEntry = {secure}
            style={styles.input}
            onChangeText= {(text)=>{setOutput(text);}}
            value = {value}
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
