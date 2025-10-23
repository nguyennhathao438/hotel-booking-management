import { MapContainer, TileLayer, Marker ,Popup} from "react-leaflet";
import { useState, useRef } from "react";
import osm from "./osm-providers";
import L from "leaflet"
import cities from "./cities.json"
import "leaflet/dist/leaflet.css"
import marker from "../../assets/img/marker.png"
function Leaflet() {
    const [center] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVER = 9;
    const mapRef = useRef();
    const markerIcon = new L.icon({
      iconUrl : marker,
      iconSize: [35,45],
      iconAnchor : [17,46],
      popupAnchor : [0,-46],
    })
    return (
        <>
            <div className="w-full border text-center p-2 font-bold text-xl">
                <h2>Reactjs Leaflet - Hi Mn</h2>
            </div>
            <div className="w-[600px] h-[300px] mx-auto border rounded-lg shadow">
  <MapContainer
    center={center}
    zoom={ZOOM_LEVER}
    ref={mapRef}
    className="h-full w-full"
  >
    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
    {cities.map((city,index)=>(
<Marker
     position={[city.lat,city.lng]} icon={markerIcon} key={index} >
      <Popup>
        <b>First Mark</b>
      </Popup>
    </Marker>
    ))}
  </MapContainer>
</div>

        </>
    );
}

export default Leaflet;
