// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";

import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const {createCity, isLoading} = useCities();
  const [cityName, setCityName] = useState("");
  // Disable "no-unused-vars" for the following line
  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  console.log(date)
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, SetIsLoadingGeocoding] = useState(false);
  console.log(isLoadingGeocoding);
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat & !lng) return;
      async function fetchCityData() {
        try {
          SetIsLoadingGeocoding(true);
          setGeoCodingError(""); // Use lowercase 's' here
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();
          if (!data.countryName) throw new Error("click somewhre else");
          console.log(data.countryName);
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          SetIsLoadingGeocoding(false); // Use lowercase 's' here
        }
      }

      fetchCityData(); // Call the fetchCityData function
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault(); // Fix the typo here
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app")
    
  }
  

  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  if (!lat & !lng) return <Message message="click anywahere" />;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading: ""} `} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={(date) => setDate(date)} dateFormat={"yyyy/MM/dd"} selected={date} id="date"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
