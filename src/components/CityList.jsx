import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message'
import { useCities } from '../context/CitiesContext';



const CityList = () => {
  const {cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (cities.lenght === 0) return <Message message='add your first city by using map '/>
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city}/>
      ))}
    </ul> 
  );
};

export default CityList;
