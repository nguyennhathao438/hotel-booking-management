import L from "leaflet"
import { useEffect } from "react";
import { useMap } from "react-leaflet";
export default function LeafletGeocoder() {
    const map = useMap();
    useEffect(() => {
        L.Control.geocoder({
            defaultMarkGeocode: false,
        })
            .on('markgeocode', (e) => {
                const latlng = e.geocode.center
                L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup()
                map.fitBounds(e.geocode.bbox)
            })
            .addTo(map);
    }, [])
    return null;
}