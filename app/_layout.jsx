
import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();


const RootLyout = () => {
  const [fontsLoaded, error]= useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  })

  useEffect(()=>{
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync()
  },[fontsLoaded,error])
if (!fontsLoaded && !error) return null;
  return (
    <Stack>
<Stack.Screen name="index" options={{ headerShown: false }}/>


    </Stack>
  )
}

export default RootLyout

