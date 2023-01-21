import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HeroImage } from '../assets';
import * as Animatable from 'react-native-animatable';

// 3 screens in total, one is Home, second is Discover, third is ItemScreen,
// Click one button on Home can lead to Discover to the Paris,
// Click the picture of the Pairs attractions of Discover page can bring to detailed page of each attractions.

// SafeAreaView is mobile view, its purpose is to make sure the component 
// is within the view
// OnPress is clicable function on mobile, onClick is web function

const HomeScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  return (
    <View className='bg-white flex-1 relative'>
  
      {/* First Section */}
      <View className='flex-row px-6 mt-8 items-center space-x-2'>
        <View className='w-16 h-16 bg-black rounded-full items-center justify-center'>
          <Text className='text-[#00BCC9] text-3xl font-semibold'>Go</Text>
        </View>
        <Text className='text-[#2A2B4B] text-3xl font-semibold'>Travel</Text>
      </View>

      {/* Second Section */}
      <View className='px-6 mt-8 space-y-3'>
        <Text className='text-[#3C6072] text-[40px]'>Enjoy the trip with</Text>
        <Text className='text-[#00BCC9] text-[38px] font-bold'>Good Moments</Text>
        <Text className='text-[#3C6072] text-base'>LaurensLaurensLaurensLaurensLaurensLaurensLaurensLaurensLaurensLaurensLaurensLaurensLaurens</Text>
      </View>

      {/* Third Section */}
      <View className='w-[400px] h-[400px] bg-[#00BCC9] rounded-full absolute 
        bottom-36 -right-36'></View>
      <View className='w-[400px] h-[400px] bg-[#E99265] rounded-full absolute 
        -bottom-28 -left-36'></View>

        {/* Image Section */}
      <View className='flex-1 relative items-center justify-center'>
        {/* <Image
          source={{uri: "https://cdn.pixabay.com/photo/2023/01/14/19/50/flower-7718952_1280.jpg"}}
          className='w-20 h-20 object-cover'
        /> */}
        <Animatable.Image
          animation='fadeIn'
          easing='ease-in-out'
          source={HeroImage}
          className='w-full h-full object-cover mt-20'
        />
        <TouchableOpacity 
          className='absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4
          border-[#00BCC9] rounded-full items-center justify-center'
          onClick={()=>navigation.navigate("Discover")}
          onPress={()=>navigation.navigate("Discover")}
        >
          <Animatable.View 
            animation={"pulse"} 
            easing="ease-in-out" 
            interactionCount={'infinite'} 
            className='w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]'
          >
            <Text className='text-gray-50 text-[36px] font-semibold'>Go</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen