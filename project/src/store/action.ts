import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, FetchStatus } from '../consts';
import { ActionType } from '../types/action';
import { AuthInfo } from '../types/auth-info';
import { CommentsGet } from '../types/comment-get';
import { Offers } from '../types/offers';
import { Offer } from '../types/offer';

export const selectCity = createAction<string>(ActionType.SelectCity);
export const offersByCity = createAction<{offers: Offers, city: string | undefined, sortType: string}>(ActionType.OffersByCity);
export const selectOffer = createAction<number | null>(ActionType.SelectOffer);
export const selectSortType = createAction<string>(ActionType.SelectSortType);
export const loadOffers = createAction<{offers: Offers, city: string | undefined, sortType: string | undefined}>(ActionType.LoadOffers);
export const loadCurrentOffer = createAction<Offer>(ActionType.LoadCurrentOffer);
export const loadNearPlaces = createAction<Offers>(ActionType.LoadNearPlaces);
export const loadComments = createAction<CommentsGet>(ActionType.LoadComments);
export const requireDataUnload = createAction(ActionType.RequireDataUnload);
export const requireAuthorization = createAction<AuthorizationStatus>(ActionType.RequireAuthorization);
export const requireLogout = createAction(ActionType.RequireLogout);
export const redirectToRoute = createAction<AppRoute>(ActionType.RedirectToRoute);
export const setUserAuthInfo = createAction<AuthInfo | Record<string, never>>(ActionType.SetUserAuthInfo);
export const loadFavoritesOffers = createAction<Offers>(ActionType.LoadFavoritesOffers);
export const changeIsFavoriteStatus = createAction<{id: number, isFavorite: boolean}>(ActionType.ChangeIsFavoriteStatus);
export const setStatus = createAction<FetchStatus>(ActionType.SetStatus);
