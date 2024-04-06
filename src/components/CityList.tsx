import { useCities } from "../contexts/citiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

const CityList = () => {
  const { cities, isLoading } = useCities();
  if (isLoading) return <p>loading ...</p>;
  return (
    <>
      <ul className={styles.cityList}>
        {cities?.map((city) => {
          return <CityItem city={city} key={city.id} />;
        })}
      </ul>
    </>
  );
};

export default CityList;
