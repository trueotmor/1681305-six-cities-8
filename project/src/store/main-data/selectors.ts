import { NameSpace } from '../../consts';
import { CommentsGet } from '../../types/comment-get';
import { Offer } from '../../types/offer';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';


export const getOffers = (state: State): Offers => state[NameSpace.data].offers;
export const getCurrentOffer = (state: State): Offer => state[NameSpace.data].currentOffer;
export const getNearPlaces = (state: State): Offers => state[NameSpace.data].nearPlaces;
export const getComments = (state: State): CommentsGet => state[NameSpace.data].comments;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getFavoritesOffers = (state: State): Offers => state[NameSpace.data].favoritesOffers;
export const getCity = (state: State): string | undefined => state[NameSpace.data].city;
export const getSort = (state: State): string | undefined => state[NameSpace.data].selectedSortType;
