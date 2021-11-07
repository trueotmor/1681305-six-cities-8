import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../consts';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

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
  const [currentOffer] = offers;
  const {city} = currentOffer;

  const selectedPoint = selectedID;

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
  },[map, offers, selectedPoint]);

  return (
    <div style = {{height : '100%'}} ref={mapRef}></div>
  );
}

export { Map };
export default connector( Map );
