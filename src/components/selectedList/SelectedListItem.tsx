import warmIcon from "../../assets/icons/warm.png";
import humidityIcon from "../../assets/icons/humidity.png";
import speedometerIcon from "../../assets/icons/speedometer.png";
import windIcon from "../../assets/icons/wind.png";
import deleteIcon from "../../assets/icons/delete.png";
import cloudyIcon from "../../assets/icons/cloudy.png";
import drizzleIcon from "../../assets/icons/drizzle.png";
import rainyIcon from "../../assets/icons/rainy.png";
import snowyIcon from "../../assets/icons/snowy.png";
import sunnyIcon from "../../assets/icons/sunny.png";

import styles from "../../style/components/selectedList/SelectedWeatherList.module.css";
import { useAppContext } from "../../store";
import { ReducersTypes } from "../../types";

export interface SelectedListItemType {
  city: string;
  weather: string;
  temperature: number;
  humidity: string;
  pressure: string;
  wind: string;
}
export const SelectedListItem: React.FC<SelectedListItemType> = ({
  city,
  weather,
  temperature,
  humidity,
  pressure,
  wind,
}) => {
  const { dispatch } = useAppContext();

  const getWeatherIcon = (weather: string) => {
    if (weather === "Clear") return sunnyIcon;
    if (weather === "Clouds") return cloudyIcon;
    if (weather === "Drizzle") return drizzleIcon;
    if (weather === "Rain") return rainyIcon;
    if (weather === "Thunderstorm") return rainyIcon;
    if (weather === "Snow") return snowyIcon;
    if (weather === "Atmosphere") return rainyIcon;
  };

  const getWeatherDescription = (weather: string) => {
    if (weather === "Clear") return "Sunny";
    if (weather === "Clouds") return "Cloudy";
    if (weather === "Drizzle") return "Rainy";
    if (weather === "Rain") return "Rainy";
    if (weather === "Thunderstorm") return "Thunderstorm";
    if (weather === "Snow") return "Snowy";
    if (weather === "Atmosphere") return "";
  };

  const onDeleteItem = () => {
    dispatch({
      type: ReducersTypes.RemoveCity,
      payload: city,
    });
    dispatch({
      type: ReducersTypes.RemoveCurrentWeather,
      payload: city,
    });

    dispatch({
      type: ReducersTypes.RemoveWeatherForecast,
      payload: city,
    });
  };

  return (
    <div key={city} className={styles["selected-list-item-container"]}>
      <div className={styles["selected-list-item-details"]}>
        <span>{city}</span>
      </div>
      <div className={styles["selected-list-item-details"]}>
        <img className={styles.icon} src={getWeatherIcon(weather)} alt="" />
        <span>{getWeatherDescription(weather)}</span>
      </div>
      <div className={styles["selected-list-item-details"]}>
        <img className={styles.icon} src={warmIcon} alt="" />
        <span>{temperature}°C</span>
      </div>
      <div className={styles["selected-list-item-details"]}>
        <img className={styles.icon} src={humidityIcon} alt="" />
        <span>{humidity}</span>
      </div>
      <div className={styles["selected-list-item-details"]}>
        <img className={styles.icon} src={speedometerIcon} alt="" />
        <span>{pressure}</span>
      </div>
      <div className={styles["selected-list-item-details"]}>
        <img className={styles.icon} src={windIcon} alt="" />
        <span>{wind}</span>
      </div>
      <div
        className={styles["selected-list-item-details"]}
        onClick={onDeleteItem}
      >
        <img className={styles.icon} src={deleteIcon} alt="" />
      </div>
    </div>
  );
};
