import { getRndArr } from '../utils/utils';
import { getOffers } from './offers';
import { Offer } from '../types/offer';

export const getNearPlaces = () : Offer[] => getRndArr([...getOffers()], 3, 3);
