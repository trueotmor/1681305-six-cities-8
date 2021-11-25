import { NameSpace } from '../../consts';
import { CommentsGet } from '../../types/comment-get';
import { Offer } from '../../types/offer';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';


export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getCurrentOffer = (state: State): Offer => state[NameSpace.Data].currentOffer;
export const getNearPlaces = (state: State): Offers => state[NameSpace.Data].nearPlaces;
export const getComments = (state: State): CommentsGet => state[NameSpace.Data].comments;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getFavoritesOffers = (state: State): Offers => state[NameSpace.Data].favoritesOffers;
export const getCity = (state: State): string | undefined => state[NameSpace.Data].city;
export const getSort = (state: State): string | undefined => state[NameSpace.Data].selectedSortType;
