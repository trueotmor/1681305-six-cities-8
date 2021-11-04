import { getOffersByCity } from '../utils/utils';
import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';


const initialState = {
  city: 'Paris',
  offers: getOffersByCity('Paris', 'Popular'),
  selectedID: '',
  selectedSortType: 'Popular',
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
    default:
      return state;
  }
};

export { reducer };
