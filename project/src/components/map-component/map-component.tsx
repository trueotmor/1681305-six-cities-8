import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../consts';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';

type MapProps = {
  offers : Offer[];
  selectedPoint : string | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map ({offers, selectedPoint} : MapProps) : JSX.Element {
  const [offer] = offers;
  const currentOffer = offer;
  const {city} = currentOffer;

  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

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
            selectedPoint !== undefined && point.uniqueOfferID === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedPoint]);

  return (
    <div style = {{height : '100%'}} ref={mapRef}></div>
  );
}

export default Map;
