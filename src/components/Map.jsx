import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeological";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLogicalPosition,
    getPosition,
  } = useGeolocation();
  console.log(geoLogicalPosition);
  
  const [mapLat,mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLogicalPosition) {
        setMapPosition([geoLogicalPosition.lat, geoLogicalPosition.lng]);
      }
    },
    [geoLogicalPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoLogicalPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "loding" : "use your position"}
      </Button>}
      <MapContainer
        className={styles.mapContainer}
        center={mapPosition}
        // center={[mapLng,mapLat]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.name}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DectectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DectectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e); // Move this line inside the click event handler
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
