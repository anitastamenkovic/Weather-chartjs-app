import { useState, useEffect } from "react";

import { List } from ".";
import { BaseHeading } from "../base";

import { useAppContext } from "../../store";
import { useFetchCities } from "../../services/cityHttpService";
import { fetchCurrentWeather, fetchFiveDaysWeather } from "../../services";
import {
  CitiesProps,
  CurrentWeather,
  FiveDaysWeatherType,
  ReducersTypes,
} from "../../types";
import { locationText } from "../../constants";

import styles from "../../style/components/location/LocationSearch.module.css";

export const CitiesList = () => {
  const { state, dispatch } = useAppContext();
  const { cities, country } = state;

  const [citiesList, setCitiesList] = useState<CitiesProps[]>([]);

  let isEnabled;
  if (country) {
    isEnabled = true;
  } else {
    isEnabled = false;
  }
  const { data, error, isLoading, isError } = useFetchCities(
    country,
    isEnabled
  );

  useEffect(() => {
    console.log(data);
    if (data?.length > 0) {
      setCitiesList(() => {
        return data?.map((item: CitiesProps) =>
          cities.includes(item.name) ? { ...item, checked: true } : item
        );
      });
    }
  }, [cities, data]);

  const onCityClick = (title: string) => {
    console.log(title);
  };

  const onChangeHandler = async (
    id: string,
    name: string,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    if (cities.length < 6) {
      if (cities.includes(name)) {
        dispatch({
          type: ReducersTypes.RemoveCity,
          payload: name,
        });

        dispatch({
          type: ReducersTypes.RemoveCurrentWeather,
          payload: name,
        });

        dispatch({
          type: ReducersTypes.RemoveWeatherForecast,
          payload: name,
        });
      } else {
        const weatherData = await fetchCurrentWeather(name);
        const fiveDaysWeatherData = await fetchFiveDaysWeather(name);

        if (weatherData?.city || fiveDaysWeatherData?.city) {
          dispatch({
            type: ReducersTypes.AddCity,
            payload: name,
          });

          dispatch({
            type: ReducersTypes.AddCurrentWeather,
            payload: weatherData as CurrentWeather,
          });

          dispatch({
            type: ReducersTypes.AddWeatherForecast,
            payload: fiveDaysWeatherData as FiveDaysWeatherType,
          });
        } else {
          console.log("no data");
        }
      }
      setCitiesList((prevCheckedList) => {
        return prevCheckedList.map((checkedItem) =>
          checkedItem.id === id
            ? { ...checkedItem, checked: target.checked }
            : checkedItem
        );
      });
    }
  };

  return (
    <div className={`${styles["container"]} ${styles["cities-container"]}`}>
      <BaseHeading>{locationText.cities}</BaseHeading>
      {isLoading && !isError && country && <p>Loading...</p>}
      {citiesList.length > 0 && !isError && (
        <List
          items={citiesList}
          hasCheckbox
          onChange={onChangeHandler}
          onClick={onCityClick}
        />
      )}
      {isError && country && <p>Error</p>}
      {citiesList.length <= 0 && !country && (
        <p className="text">{locationText.noCities}</p>
      )}
    </div>
  );
};
