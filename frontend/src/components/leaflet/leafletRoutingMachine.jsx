import { useMap } from "react-leaflet";
import L from "leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { useEffect } from "react";
export default function LeafletRoutingMachine() {
    const map = useMap()
    useEffect(() => {
        L.Routing.control({
            waypoints: [L.latLng(21.0285, 105.8542), L.latLng(10.7769, 106.7009)],
            lineOptions: {
                styles: [
                    {
                        color: "blue",
                        weight: 4,
                        opacity: 0.7
                    }
                ]
            },
            routeWhileDragging:false,
        }).addTo(map)
    }, [])
    return null;
}