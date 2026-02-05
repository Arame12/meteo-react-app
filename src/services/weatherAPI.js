
import axios from "axios";

const API_KEY = "ac2707ac7830629553dd65216c75ac4f";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherByCity = async (city) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      units: "metric",
      lang: "fr",
      appid: API_KEY,
    },
  });
 
  return response.data;
};
export const getForecastByCity = async (city, unit = "metric") => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      params: {
        q: city,
        appid: API_KEY,
        units: unit,
        lang: "fr"
      }
    }
  );

  return response.data;
};


