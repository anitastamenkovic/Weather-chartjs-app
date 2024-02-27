import { createContext, useReducer, useContext, useMemo } from "react";
import { InitialStateType, InitialContextType } from "../types";
import { weatherReducer } from ".";

const initialState: InitialStateType = {
  country: "",
  cities: [],
  weather: "current",
  currentWeather: [],
  weatherForecast: [],
  sliderMax: 40,
  sliderValue: 40,
};

const initialContext = { state: initialState, dispatch: () => null };

const AppContext = createContext<InitialContextType>(initialContext);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};

export { AppContext, AppProvider, useAppContext };
