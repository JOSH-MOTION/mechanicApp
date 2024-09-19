import { View, Text,  ScrollView,Image } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../components/FormField'
import { useState } from 'react'

const Signin = () => {
const [form,setForm] = useState({
  email:"",
  password:""
})
  
  return (
 <SafeAreaView className="bg-primary h-full" >
  <ScrollView >
    <View className="w-full justify-center h-full px-4 my-6">
<Image source={images.settingW} resizeMode='contain'
className=" w-[120px] h-[120px]"
/>
  <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Login to MechanicWik</Text>
    </View>


    <FormField 
    title="Email"
    value={form.email}
    handleChangeText={(e) => setForm({...form,email: e })}
    otherStyles
    
    
    />
  </ScrollView>
 </SafeAreaView> 
  )
}

export default Signin