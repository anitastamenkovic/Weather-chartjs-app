import { CountriesList, CitiesList } from ".";

import styles from "../../style/components/location/LocationSearch.module.css";

export const LocationSearch = () => {
  return (
    <div className={styles["location-search-container"]}>
      <CountriesList />
      <CitiesList />
    </div>
  );
};
