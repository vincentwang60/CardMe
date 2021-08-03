import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import { TextInput, ScrollView} from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

export default function DropdownInput({
  optionStrings,
  containerStyle,
  onChangeText = ()=>{console.log('wtf')},
  secure = false,
  inputStyle = styles.input,
  value,
  setSelected = ()=>(console.log('bruh')),
  selected,
  onDelete = ()=>(console.log('uh oh')),
})
{
  const [selectedString,setSelectedString] = useState(selected)
  const [showOptions, setShowOptions] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const ref = useRef()
  let options = []
  for (let i = 0; i < optionStrings.length; i++){
    const newText =
      <TouchableOpacity key={i} onPress={()=>{
        setShowOptions(false);
        setSelected(optionStrings[i]);
        setSelectedString(optionStrings[i]);
      }}>
        <Text style = {[styles.label,{marginBottom: 10}]}>{optionStrings[i]}</Text>
      </TouchableOpacity>
    options.push(newText)
  }
  let close
  if(showDelete){
  close =
    <View style={{left:'-70%',top:'2.5%',}}>
      <TouchableOpacity onPress={()=>onDelete()}>
       <AntDesign name="closecircle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  }
  if(showOptions){
    return(
        <View style={[containerStyle,{width:Dimensions.get('window').width*.85}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width:'35%', padding: 8}}>
              <TouchableOpacity onLongPress={()=>{console.log('things happening'); setShowDelete(!showDelete)}} onPress={()=>{setShowOptions(!showOptions)}} style={styles.dropdown}>
                <Text style={styles.label}>{selectedString}</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder='Placeholder for a placeholder'
              autoCapitalize="none"
              secureTextEntry = {secure}
              style={styles.input}
              onChangeText= {onChangeText}
              value={value}
            />
            {close}
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
      <View style={[containerStyle,{width:Dimensions.get('window').width*.85}]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{width: '100%',position: 'absolute',height: '100%',}} onLongPress={()=>{console.log('things happening'); setShowDelete(!showDelete)}}>
          </TouchableOpacity>
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
            onChangeText= {onChangeText}
            value={value}
          />
          {close}
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
