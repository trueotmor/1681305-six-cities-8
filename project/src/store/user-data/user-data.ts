import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts';
import { UserData } from '../../types/state';
import { requireAuthorization, requireLogout, setUserAuthInfo } from '../action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {},
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserAuthInfo, (state, action) => {
      state.user = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export { userData };
