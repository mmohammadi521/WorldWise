import { cityType } from "../type/citiesType";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

interface TypeProps {
  cities: cityType[];
  isLoading: boolean;
}
const CityList = ({ cities, isLoading }: TypeProps) => {
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
