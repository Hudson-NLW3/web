import Leaflet from "leaflet";

import mapMarker from "../images/map-marker.svg";

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

export default mapIcon;