import { useRef, useEffect } from 'react';
import L, {Icon, Marker} from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, DEFAULT_CITY } from '../../consts';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { useSelector } from 'react-redux';
import { getOffers } from '../../store/main-data/selectors';
import { getSelectedOffer } from '../../store/main-process/selectors';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

function Map () : JSX.Element {
  const offers = useSelector(getOffers);
  const selectedID = useSelector(getSelectedOffer);

  let city = {...DEFAULT_CITY};
  if(offers.length) {city = offers[0].city;}

  const mapRef = useRef(null);
  const map = useMap({mapRef, city});
  const offersCords = L.layerGroup();

  useEffect(() => {
    if (map) {
      offers.forEach((point) => {
        const {location} = point;
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            selectedID !== undefined && point.id === selectedID
              ? currentCustomIcon
              : defaultCustomIcon,
          );
        offersCords.addLayer(marker);
      });
      offersCords.addTo(map);
    }
    return () => { if (offersCords) { offersCords.clearLayers(); } };
  },[map, offers, selectedID, offersCords]);
  return (
    <div style = {{height : '100%'}} ref={mapRef}></div>
  );
}

export default Map;
