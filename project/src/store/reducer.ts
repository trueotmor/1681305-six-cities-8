import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { AuthorizationStatus } from '../consts';
import { CitiesNames } from '../consts';
import { SortTypes } from '../consts';


const initialState = {
  city: CitiesNames.Paris,
  offers: [],
  currentOffer: {},
  nearPlaces: [],
  comments: [],
  selectedID: null,
  selectedSortType: SortTypes.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {},
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {

    case ActionType.SelectCity:
      return {...state, city : action.payload};

    case ActionType.OffersByCity:
      return {...state, offers: action.payload};

    case ActionType.SelectOffer:
      return {...state, selectedID: action.payload};

    case ActionType.SelectSortType:
      return {...state, selectedSortType: action.payload};

    case ActionType.LoadOffers:
      return {...state, offers : action.payload, isDataLoaded: true};

    case ActionType.LoadCurrentOffer:
      return {...state, currentOffer: action.payload, isDataLoaded: true};

    case ActionType.LoadNearPlaces:
      return {...state, nearPlaces: action.payload};

    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};

    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};

    case ActionType.RequireDataUnload:
      return {...state, isDataLoaded: false};

    case ActionType.SetUserAuthInfo:
      return {...state, user: action.payload};

    case ActionType.LoadComments:
      return {...state, comments: action.payload};

    default:
      return state;
  }
};

export { reducer };
