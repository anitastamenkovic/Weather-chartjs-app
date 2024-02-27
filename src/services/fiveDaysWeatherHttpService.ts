import { errorHandler, httpService } from "./main";
import { FiveDaysWeatherDataType, FiveDaysWeatherType } from "../types";

export const fetchFiveDaysWeather = async (cityName: string) => {
  const fiveDaysWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a21f088b04f422ce5eb3221b0bf74fcf`;

  const { http } = httpService(fiveDaysWeatherURL);

  const convertTemperature = (temp: number) => {
    return Math.ceil(temp - 273.15);
  };

  try {
    const response = await http.get(fiveDaysWeatherURL);
    const data = await response.data;

    let fiveDaysWeather: FiveDaysWeatherType = {
      city: data.city.name,
      times: [],
      temperatures: [],
      humidities: [],
      pressures: [],
      weathers: [],
      winds: [],
    };

    const list: FiveDaysWeatherDataType[] = data.list;

    if (list.length > 0) {
      list.map((item: FiveDaysWeatherDataType) => {
        fiveDaysWeather.times.push(item.dt);
        fiveDaysWeather.temperatures.push(convertTemperature(item.main.temp));
        fiveDaysWeather.humidities.push(item.main.humidity + "%");
        fiveDaysWeather.pressures.push(item.main.pressure + "hPa");
        fiveDaysWeather.weathers.push(item.weather[0].main);
        fiveDaysWeather.winds.push(item.wind.speed + "m/s");
        return fiveDaysWeather;
      });
    }
    return fiveDaysWeather;
  } catch (error: any) {
    const { message: errorMessage } = errorHandler(error);
    console.log(errorMessage);
    return errorMessage;
  }
};
