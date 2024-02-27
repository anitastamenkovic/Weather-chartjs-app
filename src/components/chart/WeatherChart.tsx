import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Chart } from "react-chartjs-2";

import { BaseButton } from "../base";
import { WeatherSlider } from ".";

import { useBarChart, useLineChart } from "../../hooks";
import { useAppContext } from "../../store";
import { ReducersTypes } from "../../types";

import styles from "../../style/components/chart/WeatherChart.module.css";
import { chartText } from "../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const WeatherChart = () => {
  const { state, dispatch } = useAppContext();
  const { currentWeather, weatherForecast, weather, sliderValue } = state;

  const { barOptions, barData } = useBarChart(currentWeather);
  const { lineOptions, lineData } = useLineChart(
    weatherForecast,
    sliderValue as number
  );

  const onChangeWeather = (newWeather: string) => {
    if (weather !== newWeather) {
      dispatch({
        type: ReducersTypes.ChangeWeather,
        payload: newWeather,
      });
    } else {
      return;
    }
  };

  return (
    <div className={styles["weather-container"]}>
      <div className={styles["button-group"]}>
        <BaseButton
          name="current"
          customClass="primary"
          active={weather}
          onClick={() => onChangeWeather("current")}
        >
          {chartText.current}
        </BaseButton>
        <BaseButton
          name="forecast"
          customClass="primary"
          active={weather}
          onClick={() => onChangeWeather("forecast")}
        >
          {chartText.forecast}
        </BaseButton>
      </div>
      <div className={styles["chart-container"]}>
        <div className={styles["chart-inner-container"]}>
          {(currentWeather.length <= 0 || weatherForecast.length <= 0) && (
            <p className="text">{chartText.noData}</p>
          )}
          {currentWeather.length > 0 && weather === "current" && (
            <Bar options={barOptions} data={barData} />
          )}
          {weatherForecast.length > 0 && weather === "forecast" && (
            <Chart type="line" options={lineOptions} data={lineData} />
          )}
        </div>
        {weatherForecast.length > 0 && weather === "forecast" && (
          <div className={styles["slider-container"]}>
            <WeatherSlider />
          </div>
        )}
      </div>
    </div>
  );
};
