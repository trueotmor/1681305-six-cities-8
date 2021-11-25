import { AuthorizationStatus } from '../consts';
import { Offers } from '../types/offers';

export const getRandomInteger = (a = 0, b = 1):number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getBoolean = () : boolean => Boolean(getRandomInteger(0, 1));

export const getOffersByCity = (offers : Offers ,city  = 'Paris', sortType = 'Popular') : Offers => {
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  switch (sortType) {
    case 'Popular' :
      return cityOffers;
    case 'Price: low to high' :
      return cityOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low' :
      return cityOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first' :
      return cityOffers.sort((b, a) => a.rating - b.rating);
  }
  return cityOffers;
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export  function enumKeys<E>(element: E): (keyof E)[] {
  return Object.keys(element) as (keyof E)[];
}

export function getArrayFromEnum<E>(list: E): E[keyof E][]{
  const result:E[keyof E][] = [];
  for (const key of enumKeys(list)) {
    const item: E[keyof E] = list[key];
    result.push(item);
  }
  return result;
}


