import { View, Text,  ScrollView,Image,Alert } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../components/FormField'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '../components/CustomButton';
import { Link } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const Signin = () => {
const [form,setForm] = useState({
  email:"",
  password:""
})
const [isSubmitting, setIsSubmitting] = useState(false)

const submit = async() => {
  if(!form.username || !form.email || !form.password){
    Alert.alert('Error', 'please fill in all the fields')
  }
  setIsSubmitting(true);

  try {
    await signIn(form.email, form.password, form.username)
    router.replace('/home')
  } catch (error) {
    Alert.alert('Error', error.message)
  } finally {
    setIsSubmitting(false)
  }
}
  
  return (
 <SafeAreaView className="bg-primary h-full" >
  <ScrollView >
    <View className="w-full justify-center min-h-[85vh] px-4 my-6">
<Image source={images.settingW} resizeMode='contain'
className=" w-[120px] h-[80px]"
/>
  <Text className="text-xl text-white text-semibold mt-2 font-light">Login to MechanicWik</Text>


  <FormField 
    title="Email"
    value={form.email}
    handleChangeText={(e) => setForm({...form,email: e })}
    otherStyles="mt-7"
    keyboardType="email-address"
    />
      
      <FormField 
    title="Password"
    value={form.password}
    handleChangeText={(e) => setForm({...form,password: e })}
    otherStyles="mt-7"
   
    />
    <CustomButton 
    title="Sign in"
    handlePress={submit}
    containerStyles="mt-7"
    isLoading={isSubmitting}
    />
    <View className="justify-center pt-2 flex-row gap-2">
      <Text className="text-sm text-white font-normal">Don't have an account?</Text>
      <Link href="/sign-up" className='text-sm font-pbold text-secondary'>Sign up</Link>
    </View>
    </View>


  </ScrollView>
  <StatusBar backgroundColor='#161622' 
    style='light'/>
 </SafeAreaView> 
  )
}

export default Signin