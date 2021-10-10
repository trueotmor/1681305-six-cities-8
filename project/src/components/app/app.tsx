import {Switch, Route, BrowserRouter} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/fivorates-screen';
import LoginScreen from '../login-screen/login-screen';
import OfferScreen from '../offer-screen/offer-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';


type AppScreenProps = {
  placesCount : number;
}

function App({placesCount}:AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainScreen placesCount={placesCount}/>
        </Route>
        <PrivateRoute path={AppRoute.Favorites} exact render={()=> <FavoritesScreen/>} authorizationStatus={AuthorizationStatus.Auth}>
        </PrivateRoute>
        <Route path={AppRoute.Room} exact>
          <OfferScreen/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <LoginScreen/>
        </Route>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
