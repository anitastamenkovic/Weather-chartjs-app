import React from "react";

export interface CurrentWeather {
  city: string;
  temp: number;
  humidity: string;
  pressure: string;
  weather: string;
  wind: string;
}

export interface FiveDaysWeather {
  city: string;
  times: number[];
  temperatures: number[];
  humidities: string[];
  pressures: string[];
  weathers: string[];
  winds: string[];
}

export interface InitialStateType {
  country: string;
  cities: string[];
  weather: string;
  currentWeather: CurrentWeather[];
  weatherForecast: FiveDaysWeather[];
  sliderMax: number;
  sliderValue: number | number[];
}

export interface InitialContextType {
  state: InitialStateType;
  dispatch: React.Dispatch<ActionType>;
}

export enum ReducersTypes {
  ChangeCountry = "CHANGE_COUNTRY",
  AddCity = "ADD_CITY",
  RemoveCity = "REMOVE_CITY",
  ChangeWeather = "CHANGE_WEATHER",
  AddCurrentWeather = "ADD_CURRENT_WEATHER",
  RemoveCurrentWeather = "REMOVE_CURRENT_WEATHER",
  AddWeatherForecast = "ADD_WEATHER_FORECAST",
  RemoveWeatherForecast = "REMOVE_WEATHER_FORECAST",
  ChangeSliderValue = "CHANGE_SLIDER_VALUE",
}

export type ActionType =
  | { type: ReducersTypes.ChangeCountry; payload: string }
  | {
      type: ReducersTypes.AddCity;
      payload: string;
    }
  | {
      type: ReducersTypes.RemoveCity;
      payload: string;
    }
  | {
      type: ReducersTypes.ChangeWeather;
      payload: string;
    }
  | {
      type: ReducersTypes.AddCurrentWeather;
      payload: CurrentWeather;
    }
  | {
      type: ReducersTypes.RemoveCurrentWeather;
      payload: string;
    }
  | {
      type: ReducersTypes.AddWeatherForecast;
      payload: FiveDaysWeather;
    }
  | {
      type: ReducersTypes.RemoveWeatherForecast;
      payload: string;
    }
  | { type: ReducersTypes.ChangeSliderValue; payload: number | number[] };
