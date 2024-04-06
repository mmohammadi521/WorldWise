import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import { LatLngExpression } from "leaflet";
import { useCities } from "../contexts/citiesContext";
import { useSearchParams } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const mapLat = Number(searchParams.get("lat"));
  const mapLng = Number(searchParams.get("lng"));
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([
          geolocationPosition["lat"],
          geolocationPosition["lng"],
        ]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

interface ChangeProps {
  position: LatLngExpression;
}
function ChangeCenter({ position }: ChangeProps) {
  const map = useMap();
  map.setView(position);
  return null;
}
export default Map;
