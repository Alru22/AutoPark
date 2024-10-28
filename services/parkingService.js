import axios from 'axios';

// Token for HERE API
const token = 'zYvwU03vKXuJp7eN53cuOGJxJs1M4vE33Vnl17_3cmJSah93mtd55efBnjrnN5CoJqaMa-XPw6FMUVJ-oYbaTg';

// Funktion til at hente parkeringsdata fra HERE API. Det burde virke, men jeg løber hele tiden ind i en 401-fejl. Jeg har prøvet at kontakte support, men har ikke fået svar fra dem endnu :(
export const fetchParkingData = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://parking-v2.cc.api.here.com/parking/facilities.json`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          prox: `${latitude},${longitude},500`, //Meningen er at man tager brugerens lokation og finder parkeringspladser indenfor 500 meter.
        },
      }
    );
    return response.data.parkingSegments;
  } catch (error) {
    console.error("Error fetching parking data:", error);
    return [];
  }
};