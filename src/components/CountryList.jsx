
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from '../context/CitiesContext';

const CountriesList = () => {
  const {cities, isLoading } = useCities();
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);
  console.log(countries)
  if (isLoading) return <Spinner />;
  if (cities.lenght === 0)
    return <Message message="add your first country by using map " />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={'dsfd'} country={country} />
      ))}
    </ul>
  );
};

export default CountriesList;
