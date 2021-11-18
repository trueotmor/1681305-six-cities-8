import {useRef, useEffect} from 'react';
import L, {Icon, Marker} from 'leaflet';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, DEFAULT_CITY} from '../../consts';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';

const mapStateToProps = ({offers, selectedID} : State) => ({
  offers,
  selectedID,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

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

function Map (props : PropsFromRedux) : JSX.Element {
  const { offers, selectedID } = props;

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

export { Map };
export default connector( Map );
