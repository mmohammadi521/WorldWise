import { cityType } from "../type/citiesType";
import styles from "./CityItem.module.css";

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
  const { cityName, emoji, date } = city;
  return (
    <>
      <li className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </li>
    </>
  );
};

export default CityItem;
