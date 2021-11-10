import { AuthorizationStatus } from '../consts';
import { Offer } from './offer';

export type State = {
  city: string,
  offers: Offer[],
  selectedID : string,
  selectedSortType : string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded : boolean,
}
