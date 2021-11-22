import { createReducer } from '@reduxjs/toolkit';
import { MainProcess } from '../../types/state';
import { selectOffer } from '../action';

const initialState: MainProcess = {
  selectedID: null,
};

const mainProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(selectOffer, (state, action) => {
      state.selectedID = action.payload;
    });
});

export { mainProcess };
