import { AuthorizationStatus, AppRoute } from '../consts';
import { ActionType } from '../types/action';
import { AuthInfo } from '../types/auth-info';
import { CommentsGet } from '../types/comment-get';
import { Offers } from '../types/offers';
import { State } from '../types/state';
import { getOffersByCity } from '../utils/utils';

export const selectCity = (city: string) => ({
  type: ActionType.SelectCity,
  payload: city,
} as const);

export const offersByCity = (offers: Offers, city: string, sortType: string) => ({
  type: ActionType.OffersByCity,
  payload: getOffersByCity(offers, city, sortType),
} as const);

export const selectOffer = (ID: number | null) => ({
  type: ActionType.SelectOffer,
  payload: ID,
} as const);

export const selectSortType = (type: string) => ({
  type: ActionType.SelectSortType,
  payload: type,
} as const);

export const loadOffers = (offers: Offers, city: string | undefined, sortType: string | undefined) => ({
  type: ActionType.LoadOffers,
  payload: getOffersByCity(offers, city, sortType),
} as const);

export const loadCurrentOffer = (offer: State['currentOffer']) => ({
  type: ActionType.LoadCurrentOffer,
  payload: offer,
}) as const;

export const loadNearPlaces = (offers: Offers) => ({
  type: ActionType.LoadNearPlaces,
  payload: offers,
} as const);

export const loadComments = (comments: CommentsGet) => ({
  type: ActionType.LoadComments,
  payload: comments,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const requireDataUnload = () => ({
  type: ActionType.RequireDataUnload,
} as const);

export const setUserAuthInfo = (data: AuthInfo | Record<string, never> = {}) => ({
  type: ActionType.SetUserAuthInfo,
  payload: data,
} as const);
