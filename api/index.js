import axios from 'axios';

// Changing the type dynamically of url to render different attraction types

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const { data: { data } } = 
      await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
        // bl_latitude: bl_lat ? bl_lat: '48.856666',
        // tr_latitude: tr_lat ? tr_lat: '49.856666',
        // bl_longitude: bl_lng ? bl_lng: '2.352222',
        // tr_longitude: tr_lng ? tr_lng: '3.352222',
        bl_latitude: '48.856666',
        tr_latitude: '49.856666',
        bl_longitude: '2.352222',
        tr_longitude: '3.352222',
        limit: '30',
        currency: 'USD',
        lunit: 'km',
        lang: 'en_US'
      },
      headers: {
        'X-RapidAPI-Key': 
          '7f6a204371msh012700eff3ace20p111d06jsn529cb6adc66a',
        'X-RapidAPI-Host': 
          'travel-advisor.p.rapidapi.com'
      }
  }
    )
    return data
  } catch (error) {
    return null
  }
}