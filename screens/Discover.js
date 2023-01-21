import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } 
  from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import MenuContainer from '../components/MenuContainer';
import ItemContainer from '../components/ItemContainer';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Hotels, Attractions, Restaurants, NotFound } from '../assets';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesome } from '@expo/vector-icons';
import { getPlacesData } from '../api';

// GooglePlacesAutocomplete does not work on web properly.
// The difference between useEffect and useLayout is useEffeft will rerender the UI
// after something change, useEffect will rerender component instead.

// Create a state to manage search latitude and longitude
// Everytime update the state, change the url dynamically, by passing the state value
// to useState and indexjs of api, if else statement to render

// Changing the type dynamically of url to render different attraction types

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);

  // location
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false)
      }, 100);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  return (
    <View className='flex-1 bg-white relative'>
      <View className='flex-row items-center justify-between px-8'>
        <View>
          <Text className='text-[40px] text-[#0B646B] font-bold'>Discover</Text>
          <Text className='text-[#527283] text-[36px]'>the beauty today</Text>
        </View>
        <View className='w-12 h-12 bg-gray-400 rounded-md item-center justify-center 
          shadow-sm'>
          <Image
            source={Avatar}
            className='w-full h-full rounded-md object-cover'
          />
        </View>
      </View>
      <View className='flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg'>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields: "geometry"}}
          placeholder='Search'
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest.lat);
            setBl_lng(details?.geometry?.viewport?.southwest.lng);
            setTr_lat(details?.geometry?.viewport?.northeast.lat);
            setTr_lng(details?.geometry?.viewport?.northeast.lng);
          }}
          query={{
            key: 'AIzaSyB47l6asnd0vN0lOrmumQbmm15j__tzRHg',
            language: 'en',
          }}
        />
      </View>

      {/* Menu Container */}
      {isLoading ? 
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View> :
      <ScrollView>
        <View className='flex-row items-center justify-between px-8 mt-8'>
          <MenuContainer
            key={"hotel"}
            title="Hotels"
            imageSrc = {Hotels}
            type={type}
            setType={setType}
          />
          <MenuContainer
            key={"attractions"}
            title="Attractions"
            imageSrc = {Attractions}
            type={type}
            setType={setType}
          />
          <MenuContainer
            key={"restaurants"}
            title="Restaurants"
            imageSrc = {Restaurants}
            type={type}
            setType={setType}
          />
        </View>

        {/* Small Card Container */}
        <View>
          <View className='flex-row items-center justify-between px-4 mt-8'>
            <Text className='text-[#2C7379] text-[28px] font-bold'>Top Tips</Text>
            <TouchableOpacity className='flex-row items-center justify-center space-x-2'>
              <Text className='text-[#A0C4C7] text-[20px] font-bold'>Explore</Text>
              <FontAwesome name='long-arrow-right' size={24} color='#A0C4C7' />
            </TouchableOpacity>
          </View>

          {/* Render dynamically with API */}
          <View className='px-4 mt-8 flex-row justify-evenly flex-wrap'>
            {mainData?.length > 0 ? (
            <>
              {mainData?.map((data, index) => (
                <ItemContainer 
                  key={index} 
                  imageSrc={
                    data?.photo?.images?.medium.url ?
                    data?.photo?.images?.medium.url :
                    'https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg'
                  } 
                  title={data?.name}
                  location={data?.location_string}
                  data={data}
              />
              ))}
              <ItemContainer 
                key={'102'} 
                imageSrc={'https://cdn.pixabay.com/photo/2023/01/12/07/19/rat-7713508_1280.jpg'} 
                title='Rat' 
                location='Garden'
              />
            </>
            ) : (
              <>
                <View className='w-full h-[400px] items-center space-y-8 justify-center'>
                  <Image
                    source={NotFound}
                    className='w-32 h-32 object-cover'
                  />
                </View>
                <Text className='text-2xl text-[#4282BB] font-semibold'>
                  Opps... No Data Found
                </Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      }
    </View>
  )
}

export default Discover