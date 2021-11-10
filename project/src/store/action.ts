import { AuthorizationStatus } from '../consts';
import { ActionType } from '../types/action';
import { Offer } from '../types/offer';
import { getOffersByCity } from '../utils/utils';

export const selectCity = (city: string) => ({
  type: ActionType.SelectCity,
  payload: city,
} as const);

export const offersByCity = (city: string, sortType: string) => ({
  type: ActionType.OffersByCity,
  payload: getOffersByCity(city, sortType),
} as const);

export const resetCity = () => ({
  type: ActionType.ResetCity,
} as const);

export const selectOffer = (ID: string) => ({
  type: ActionType.SelectOffer,
  payload: ID,
} as const);

export const selectSortType = (type: string) => ({
  type: ActionType.SelectSortType,
  payload: type,
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
