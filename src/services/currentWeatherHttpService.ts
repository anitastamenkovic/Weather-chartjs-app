import { errorHandler, httpService } from "./main";
import { CurrentWeather } from "../types";

export const fetchCurrentWeather = async (cityName: string) => {
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a21f088b04f422ce5eb3221b0bf74fcf`;

  const { http } = httpService(currentWeatherURL);

  const convertTemperature = (temp: number) => {
    return Math.ceil(temp - 273.15);
  };

  try {
    const response = await http.get(currentWeatherURL);
    const data = await response.data;

    const currentWeather: CurrentWeather = {
      city: data.name,
      temp: convertTemperature(data.main.temp),
      humidity: `${data.main.humidity}%`,
      pressure: `${data.main.pressure} hPa`,
      weather: data.weather[0].main,
      wind: `${data.wind.speed} m/s`,
    };

    return currentWeather;
  } catch (error: any) {
    const { message: errorMessage } = errorHandler(error);
    console.log(errorMessage);
    return errorMessage;
  }
};
