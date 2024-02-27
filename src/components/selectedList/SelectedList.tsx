import { SelectedListItem } from ".";

import { useAppContext } from "../../store";
import { CurrentWeather, FiveDaysWeather } from "../../types";

import styles from "../../style/components/selectedList/SelectedWeatherList.module.css";

export const SelectedList = () => {
  const { state } = useAppContext();
  const { weather, currentWeather, weatherForecast, sliderValue } = state;

  let index = (sliderValue as number) - 1;

  return (
    <div className={styles["selected-list-container"]}>
      {weather === "current" &&
        currentWeather.map((item: CurrentWeather) => (
          <SelectedListItem
            key={item.city}
            city={item.city}
            weather={item.weather}
            temperature={item.temp}
            humidity={item.humidity}
            pressure={item.pressure}
            wind={item.wind}
          />
        ))}
      {weather === "forecast" &&
        weatherForecast.map((item: FiveDaysWeather) => (
          <SelectedListItem
            key={item.city}
            city={item.city}
            weather={item.weathers[index]}
            temperature={item.temperatures[index]}
            humidity={item.humidities[index]}
            pressure={item.pressures[index]}
            wind={item.winds[index]}
          />
        ))}
    </div>
  );
};
