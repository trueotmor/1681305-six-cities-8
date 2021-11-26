import React from 'react';
import ReactDOM from 'react-dom';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { requireAuthorization } from './store/action';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import { AuthorizationStatus, CityName, SortType } from './consts';
import { redirect } from './store/middlewares/redirect';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),

});

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction(CityName.Paris, SortType.Popular));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
