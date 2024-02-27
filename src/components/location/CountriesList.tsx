import { useState } from "react";

import { BaseHeading } from "../base";
import { List } from ".";

import { useAppContext } from "../../store";
import { useFetchCountries } from "../../services/countryHttpService";
import { ReducersTypes } from "../../types";
import { locationText } from "../../constants";

import styles from "../../style/components/location/LocationSearch.module.css";

export const CountriesList = () => {
  const { state, dispatch } = useAppContext();
  const [activeCountry, setActiveCountry] = useState(state.country);

  const { data, error, isError, isLoading } = useFetchCountries();

  const onCountryClick = (title: string) => {
    setActiveCountry(title);
    dispatch({
      type: ReducersTypes.ChangeCountry,
      payload: title.toLowerCase(),
    });
  };

  return (
    <div className={`${styles["container"]} ${styles["countries-container"]}`}>
      <BaseHeading>{locationText.countries}</BaseHeading>
      {isLoading && <p>Loading...</p>}
      {data && (
        <List items={data} active={activeCountry} onClick={onCountryClick} />
      )}
      {isError && <p>Error</p>}
    </div>
  );
};
