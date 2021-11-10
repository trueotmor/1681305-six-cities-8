import {MutableRefObject, useEffect, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import {Offer} from '../types/offer';

type CityProps = Pick<Offer, 'city'>;

type useMapProps = CityProps & {
  mapRef : MutableRefObject<HTMLElement | null>,
}

function useMap({mapRef, city} : useMapProps) : Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const {location} = city;
  const {latitude, longitude, zoom} = location;

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, city, latitude, longitude, zoom]);

  return map;
}

export default useMap;
