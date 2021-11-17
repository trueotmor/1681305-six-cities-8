import { AuthorizationStatus } from '../consts';
import { AuthInfo } from './auth-info';
import { CommentsGet } from './comment-get';
import { Offer } from './offer';
import { Offers } from './offers';

export type State = {
  city: string,
  offers: Offers,
  selectedID : number | null,
  selectedSortType : string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded : boolean,
  user : AuthInfo | Record<string, never>,
  currentOffer: Offer | Record<string, never>,
  nearPlaces: Offers,
  comments: CommentsGet,
}
