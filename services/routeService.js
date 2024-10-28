import axios from 'axios';

/*Min Google API key*/
const API_KEY = 'AIzaSyDUNyWP2dRLatEeZodTTWeFialzCQdeUUs';

/*se dokumentation for Google Directions API https://developers.google.com/maps/documentation/embed/get-api-key*/
export const getRoute = async (latitude, longitude, destinationCoordinates) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin: `${latitude},${longitude}`,
          destination: destinationCoordinates, // Using coordinates as destination
          key: API_KEY,
        },
      }
    );
    return response.data.routes[0];
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
};
