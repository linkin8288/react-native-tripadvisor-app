import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
// handle click function, if you click the type, and the CSS change. That is how
// type and setType of useState have been passed

const MenuContainer = ({title, imageSrc, type, setType}) => {

  const handlePress = () => {
    setType(title.toLowerCase())
  };

  return (
    <TouchableOpacity className='items-center justify-center space-y-2'
      onPress={handlePress}
      onClick={handlePress}
    >
      <View 
        className={`w-24 h-24 p-2 shadow-sm rounded-full items-center justify-center ${
          type === title.toLowerCase() ? "bg-gray-200" : ""
        }`}
        >
        <Image
          source={imageSrc}
          className='w-full h-full object-contain'
        />
      </View>
      <Text className='text-[#00BCC9] text-xl font-semibold'>{title}</Text>
    </TouchableOpacity>
  )
}

export default MenuContainer