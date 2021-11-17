import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { reducer } from './store/reducer';
import { requireAuthorization } from './store/action';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import { ThunkAppDispatch } from './types/action';
import { AuthorizationStatus, CitiesNames, SortTypes } from './consts';
import { redirect } from './store/middlewares/redirect';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ));

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction(CitiesNames.Paris, SortTypes.Popular));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
