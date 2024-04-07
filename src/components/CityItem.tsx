import { Link } from "react-router-dom";
import { cityType } from "../type/citiesType";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/citiesContext";

interface PropsType {
  city: cityType;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }: PropsType) => {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const deletItem = (e: any) => {
    e.preventDefault();
    deleteCity(id);
  };
  return (
    <>
      <li>
        <Link
          className={`${styles.cityItem} ${
            id === currentCity?.id ? styles["cityItem--active"] : ""
          }`}
          to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        >
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>({formatDate(date)})</time>
          <button className={styles.deleteBtn} onClick={deletItem}>
            &times;
          </button>
        </Link>
      </li>
    </>
  );
};

export default CityItem;
