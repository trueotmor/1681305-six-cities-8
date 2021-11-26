import { AuthorizationStatus, FetchStatus } from '../consts';
import { AuthInfo } from './auth-info';
import { CommentsGet } from './comment-get';
import { Offer } from './offer';
import { Offers } from './offers';
import { RootState } from '../store/root-reducer';

export type State = RootState;

export type UserData = {
  authorizationStatus: AuthorizationStatus,
  user: AuthInfo,
}

export type MainData = {
  offers: Offers,
  favoritesOffers: Offers,
  currentOffer: Offer,
  nearPlaces: Offers,
  comments: CommentsGet,
  isDataLoaded: boolean,
  city: string | undefined,
  selectedSortType: string | undefined,
  status: FetchStatus,
}

export type MainProcess = {
  selectedID : number | null,
}

