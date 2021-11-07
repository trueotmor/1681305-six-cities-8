import { Offer } from '../types/offer';

export enum ActionType {
  SelectCity = 'main/selectCity',
  OffersByCity = 'main/sortByCity',
  ResetCity = 'main/resetCity',
  SelectOffer = 'main/selectOffer',
  SelectSortType = 'main/selectSortType',
}

export type SelectCityAction = {
  type : ActionType.SelectCity;
  payload : string;
}

export type OffersByCityAction = {
  type : ActionType.OffersByCity;
  payload : Offer[];
}

export type ResetCityAction = {
  type : ActionType.ResetCity;
}

export type SelectOfferAction = {
  type : ActionType.SelectOffer;
  payload : string;
}

export type SelectSortTypeAction = {
  type : ActionType.SelectSortType;
  payload : string;
}

export type Actions = SelectCityAction | OffersByCityAction | ResetCityAction | SelectOfferAction | SelectSortTypeAction;
