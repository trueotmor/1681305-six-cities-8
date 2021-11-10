import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { loadOffers, offersByCity, requireAuthorization, requireLogout, resetCity, selectCity, selectOffer, selectSortType } from '../store/action';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/selectCity',
  OffersByCity = 'main/sortByCity',
  ResetCity = 'main/resetCity',
  SelectOffer = 'main/selectOffer',
  SelectSortType = 'main/selectSortType',
  LoadOffers = 'data/loadOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type Actions =
| ReturnType<typeof selectCity>
| ReturnType<typeof offersByCity>
| ReturnType<typeof selectOffer>
| ReturnType<typeof selectSortType>
| ReturnType<typeof resetCity>
| ReturnType<typeof loadOffers>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
