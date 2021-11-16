import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import {
  loadComments,
  loadCurrentOffer,
  loadNearPlaces,
  loadOffers,
  offersByCity,
  redirectToRoute,
  requireAuthorization,
  requireDataUnload,
  requireLogout,
  selectCity,
  selectOffer,
  selectSortType,
  setUserAuthInfo
} from '../store/action';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/selectCity',
  OffersByCity = 'main/sortByCity',
  SelectOffer = 'main/selectOffer',
  SelectSortType = 'main/selectSortType',
  LoadOffers = 'data/loadOffers',
  LoadNearPlaces = 'data/loadNearPlaces',
  LoadComments = 'data/loadComments',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  RequireDataUnload = 'data/requireDataUnload',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
  SetUserAuthInfo = 'user/setUserAuthInfo',
}

export type Actions =
| ReturnType<typeof selectCity>
| ReturnType<typeof offersByCity>
| ReturnType<typeof selectOffer>
| ReturnType<typeof selectSortType>
| ReturnType<typeof loadOffers>
| ReturnType<typeof loadNearPlaces>
| ReturnType<typeof loadComments>
| ReturnType<typeof loadCurrentOffer>
| ReturnType<typeof requireDataUnload>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>
| ReturnType<typeof redirectToRoute>
| ReturnType<typeof setUserAuthInfo>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
