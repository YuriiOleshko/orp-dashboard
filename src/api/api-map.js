import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_MAP_API_ENDPOINT;
const ApiMap = () => {
  const api = axios.create({
    baseURL: baseApiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      access_token: process.env.REACT_APP_MAP_KEY,
    },
  });

  return api;
};

const getInfoForMap = (lat, lng) => ApiMap()
  .get(`mapbox.places/${lng},${lat}.json`)
  .then((data) => data.data)
  .catch((err) => {
    console.error(err);
    return false;
  });

const wrapperAPI = {
  API: ApiMap(),
  getInfoForMap,
};

export default wrapperAPI;
