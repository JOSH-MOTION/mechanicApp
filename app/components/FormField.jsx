import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import {  } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormField = ({title,value,handleChangeText,otherStyles,placeholder, ...props}) => {

  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-normal">{title}</Text>
      <View className="border-2 border-black-200 w-full
      h-14 px-4 bg-black-200 rounded-2xl focus:border-secondary items-center flex-row">

        <TextInput className="flex-1 text-white font-psemibold text-base"
        value={value} 
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
        /> 
        {title=== 'Password' &&(
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color="white" size={20} />
        </TouchableOpacity>
        )}

     

      </View>
    </View>
  )
}

export default FormField
