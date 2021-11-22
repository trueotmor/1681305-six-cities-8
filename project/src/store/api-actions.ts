import { APIRoute, AppRoute, AuthorizationStatus } from '../consts';
import { saveToken, dropToken } from '../services/token';
import { ThunkActionResult } from '../types/action';
import { Offer } from '../types/offer';
import { Offers } from '../types/offers';
import { AuthData } from '../types/auth-data';
import {
  loadOffers,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  loadCurrentOffer,
  selectCity,
  loadNearPlaces,
  loadComments,
  setUserAuthInfo,
  changeIsFavoriteStatus,
  loadFavoritesOffers
} from './action';

import camelcaseKeys from 'camelcase-keys';
import { CommentsGet } from '../types/comment-get';
import { AuthInfo } from '../types/auth-info';
import { CommentPost } from '../types/comment-post';
import { getCurrentOffer } from './main-data/selectors';
import { getAuthorizationStatus } from './user-data/services';
import { OfferFromServer } from '../types/offer-from-server';

const adaptedOffers = (data: Offers) => data.map((offer) => camelcaseKeys(offer, {deep: true}));
const adaptedComments = (data: CommentsGet) => data.map((comment) => camelcaseKeys(comment, {deep: true}));

export const fetchOffersAction = (city: string, sortType: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offers>(APIRoute.Hotels);
    const offers = adaptedOffers(data);
    dispatch(loadOffers({offers, city, sortType}));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      })
      .catch((error) => {
        dispatch(requireLogout());
      });
  };


export const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<AuthInfo>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(setUserAuthInfo(data));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    dispatch(setUserAuthInfo({}));
  };


export const fetchCurrentOfferAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get<Offer>(`${APIRoute.Hotels}/${id}`)
      .then(({data}) => {
        const city = data.city.name;
        dispatch(loadCurrentOffer(camelcaseKeys(data, {deep: true})));
        dispatch(selectCity(city));
      })
      .catch(() => {
        dispatch(loadCurrentOffer({}));
      });
  };

export const fetchNearPlacesAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offers>(`${APIRoute.Hotels}/${id}${APIRoute.Nearby}`);
    dispatch(loadNearPlaces(adaptedOffers(data)));
  };

export const fetchCommentsAction = (): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const objectId = getCurrentOffer(getState()).id;
    const {data} = await api.get<CommentsGet>(`${APIRoute.Comments}/${objectId}`);
    dispatch(loadComments(adaptedComments(data)));
  };

export const fetchReviewAction = (review: CommentPost): ThunkActionResult =>
  async (dispatch, getState, api) => {
    const objectId = getCurrentOffer(getState()).id;
    const {data} = await api.post<CommentsGet>(`${APIRoute.Comments}/${objectId}`, review);
    dispatch(loadComments(adaptedComments(data)));
  };

export const fetchFavoritesOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    dispatch(loadFavoritesOffers(adaptedOffers(data)));
  };

export const fetchFavoritesAction = (objectId: number, wasFavorite: boolean): ThunkActionResult =>
  async (dispatch, getState, api) => {
    const isAuthorized = getAuthorizationStatus(getState());
    if (isAuthorized === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }

    const {data} = await api.post<OfferFromServer>(`${APIRoute.Favorite}/${objectId}/${Number(!wasFavorite)}`);
    const changedOffer = camelcaseKeys(data, {deep: true});
    const {id, isFavorite} = changedOffer;
    dispatch(changeIsFavoriteStatus({ id, isFavorite }));
  };