// import { getOffersByCity } from '../utils/utils';

import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { AuthorizationStatus } from '../consts';


const initialState = {
  city: 'Paris',
  offers: [],
  selectedID: '',
  selectedSortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, city : action.payload};
    case ActionType.OffersByCity:
      return {...state, offers: action.payload};
    case ActionType.ResetCity:
      return {...initialState};
    case ActionType.SelectOffer:
      return {...state, selectedID: action.payload};
    case ActionType.SelectSortType:
      return {...state, selectedSortType: action.payload};
    case ActionType.LoadOffers:
      return {...state, offers : action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export { reducer };
