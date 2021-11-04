import {ActionType, SelectCityAction, OffersByCityAction, ResetCityAction, SelectOfferAction, SelectSortTypeAction} from '../types/action';
import { getOffersByCity } from '../utils/utils';

export const selectCity = (city: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const offersByCity = (city: string, sortType: string): OffersByCityAction => ({
  type: ActionType.OffersByCity,
  payload: getOffersByCity(city, sortType),
});

export const resetCity = (): ResetCityAction => ({
  type: ActionType.ResetCity,
});

export const selectOffer = (ID: string): SelectOfferAction => ({
  type: ActionType.SelectOffer,
  payload: ID,
});

export const selectSortType = (type: string): SelectSortTypeAction => ({
  type: ActionType.SelectSortType,
  payload: type,
});
