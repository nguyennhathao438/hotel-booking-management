import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import LeafletGeocoder from "./leafletGeocoder";
import "leaflet-control-geocoder"; 
import "leaflet-control-geocoder/dist/Control.Geocoder.css"; 
import LeafletRoutingMachine from "./leafletRoutingMachine";
import "leaflet/dist/leaflet.css";
import marker from "../../assets/img/marker.png";
function Leaflet() {
  // const [center] = useState({ lat: 13.084622, lng: 80.248357 });
  // const ZOOM_LEVER = 9;
  // const mapRef = useRef();
  const defaultIcon = new L.icon({
    iconUrl: marker,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  })
  // const defaultIcon = new L.icon({
  //   iconUrl: marker
  // })
  L.Marker.prototype.options.icon = defaultIcon
  const position = [21.03204, 105.85144]
  return (
    <div className="w-[100%] h-[80vh] mx-auto">
      <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="h-full w-full" >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LeafletRoutingMachine/>
      </MapContainer>
    </div>
  );
}

export default Leaflet;



// <>
//   <div className="w-full border text-center p-2 font-bold text-xl">
//     <h2>Reactjs Leaflet - Hi Mn</h2>
//   </div>
//   <div className="w-[600px] h-[300px] mx-auto border rounded-lg shadow">
//     <MapContainer
//       center={center}
//       zoom={ZOOM_LEVER}
//       ref={mapRef}
//       className="h-full w-full"
//     >
//       <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
//       {cities.map((city, index) => (
//         <Marker
//           position={[city.lat, city.lng]} icon={markerIcon} key={index} >
//           <Popup>
//             <b>First Mark</b>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   </div>
// </>
