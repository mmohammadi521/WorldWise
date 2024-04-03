import styles from "./CountryItem.module.css";
import { CountryType } from "./CountryList";

interface PropsType {
  country: CountryType;
}
function CountryItem({ country }: PropsType) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
