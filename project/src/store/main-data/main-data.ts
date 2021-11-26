import { createReducer } from '@reduxjs/toolkit';
import { CityName, FetchStatus, SortType } from '../../consts';
import { MainData } from '../../types/state';
import { getOffersByCity } from '../../utils/utils';
import {
  changeIsFavoriteStatus,
  loadComments,
  loadCurrentOffer,
  loadFavoritesOffers,
  loadNearPlaces,
  loadOffers,
  offersByCity,
  requireDataUnload,
  selectCity,
  selectSortType,
  setStatus
} from '../action';

const initialState: MainData = {
  offers: [],
  currentOffer: {},
  nearPlaces: [],
  comments: [],
  isDataLoaded: false,
  favoritesOffers: [],
  city: CityName.Paris,
  selectedSortType: SortType.Popular,
  status : FetchStatus.Fetched,
};

const mainData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = getOffersByCity(action.payload.offers, action.payload.city, action.payload.sortType);
      state.isDataLoaded = true;
    })
    .addCase(offersByCity, (state, action) => {
      state.offers = getOffersByCity(action.payload.offers, action.payload.city, action.payload.sortType);
      state.isDataLoaded = true;
    })
    .addCase(loadFavoritesOffers, (state, action) => {
      state.favoritesOffers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(changeIsFavoriteStatus, (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (index >= 0) {
        state.offers[index].isFavorite = action.payload.isFavorite;
      }
    })
    .addCase(loadNearPlaces, (state, action) => {
      state.nearPlaces = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(requireDataUnload, (state) => {
      state.isDataLoaded = false;
    })
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(selectSortType, (state, action) => {
      state.selectedSortType = action.payload;
    })
    .addCase(setStatus, (state, action) => {
      state.status = action.payload;
    });
});

export { mainData };
