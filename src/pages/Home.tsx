import { WeatherChart } from "../components/chart";
import { LocationSearch } from "../components/location";
import { SelectedList } from "../components/selectedList";

import styles from "../style/components/pages/Home.module.css";

const Home = () => {
  return (
    <main>
      <section className={`${styles["section"]} ${styles["chart-section"]}`}>
        <WeatherChart />
        <SelectedList />
      </section>
      <div className={styles.divider}></div>
      <section className={`${styles["section"]} ${styles["location-section"]}`}>
        <LocationSearch />
      </section>
    </main>
  );
};

export default Home;
