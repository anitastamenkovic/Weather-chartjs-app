import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useAppContext } from "../../store";
import { ReducersTypes } from "../../types";

import {
  handleStylesheet,
  railStylesheet,
  trackStylesheet,
} from "../../style/components/chart/WeatherSlider";

export const WeatherSlider = () => {
  const { state, dispatch } = useAppContext();
  const { sliderMax, sliderValue } = state;

  const onSliderChange = (value: number | number[]) => {
    dispatch({
      type: ReducersTypes.ChangeSliderValue,
      payload: value,
    });
  };

  return (
    <Slider
      min={1}
      max={sliderMax}
      defaultValue={sliderValue}
      onAfterChange={onSliderChange}
      railStyle={railStylesheet}
      handleStyle={handleStylesheet}
      trackStyle={trackStylesheet}
    />
  );
};
