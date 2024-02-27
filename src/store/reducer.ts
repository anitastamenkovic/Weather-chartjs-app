import {
  InitialStateType,
  ReducersTypes,
  ActionType,
  FiveDaysWeatherType,
  CurrentWeather,
} from "../types";

export const weatherReducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case ReducersTypes.ChangeCountry:
      return { ...state, country: action.payload };
    case ReducersTypes.AddCity:
      return { ...state, cities: [...state.cities, action.payload] };
    case ReducersTypes.RemoveCity:
      return {
        ...state,
        cities: [
          ...state.cities.filter((city: string) => city !== action.payload),
        ],
      };
    case ReducersTypes.ChangeWeather:
      return { ...state, weather: action.payload };
    case ReducersTypes.AddCurrentWeather:
      return {
        ...state,
        currentWeather: [...state.currentWeather, action.payload],
      };
    case ReducersTypes.RemoveCurrentWeather:
      return {
        ...state,
        currentWeather: [
          ...state.currentWeather.filter(
            (currentWeather: CurrentWeather) =>
              currentWeather.city !== action.payload
          ),
        ],
      };
    case ReducersTypes.AddWeatherForecast:
      return {
        ...state,
        weatherForecast: [...state.weatherForecast, action.payload],
      };
    case ReducersTypes.RemoveWeatherForecast:
      return {
        ...state,
        weatherForecast: [
          ...state.weatherForecast.filter(
            (forecast: FiveDaysWeatherType) => forecast.city !== action.payload
          ),
        ],
      };
    case ReducersTypes.ChangeSliderValue:
      return { ...state, sliderValue: action.payload };
    default:
      return state;
  }
};
