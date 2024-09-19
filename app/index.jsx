import { View, Text, ScrollView,Image } from 'react-native'
import {StatusBar} from 'expo-status-bar'
import React from 'react'
import { Link, Redirect,router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
 import{images} from "../constants"
import CustomButton from './components/CustomButton'
import Signin from './(auth)/sign-in';


export default function index() {
  return (
   <SafeAreaView className="bg-black h-full">
    <ScrollView contentContainerStyle={{ height: '100%'}}>
      <View className=" flex w-full justify-center items-center h-[95%] px-4">
          <Image 
          source={images.settingW}
          className="w-[100px] h-[100px]"
          resizeMode='contain'
         />

          <Image 
          source={images.card}
          className="w-[270px] h-[220px] "
          resizeMode='contain'
          />

          <View className="relative mt-5"> 
          <Text className="text-3xl text-white font-bold text-center">
          Discover top services with Mechanic 
          <Text className="text-secondary-100">Wik</Text>
          </Text>
          </View>

          <Text className="text-sm font-pregular mt-7 text-center text-gray-50">
        Find the right mechanic quickly and easily. Your solution is just a tap away.
          </Text>
          <CustomButton 
          title='continue with Email'
          handlePress={() => router.push('./sign-in')}
          containerStyles="w-full mt-2"
          />
      </View>
    </ScrollView>
    <StatusBar backgroundColor='#161622' 
    style='light'/>
   </SafeAreaView>
  )
}