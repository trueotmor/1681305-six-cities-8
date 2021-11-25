import { Switch, Route, Router as BrowserRouter, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import LoginScreen from '../login-screen/login-screen';
import OfferScreen from '../offer-screen/offer-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user-data/services';
import Loading from '../loading/loading';

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const loggedIn = authorizationStatus===AuthorizationStatus.Auth;

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <Loading/>
    );
  }
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainScreen/>
        </Route>
        <PrivateRoute path={AppRoute.Favorites} exact render={()=> <FavoritesScreen/>}/>
        <Route path={AppRoute.Room} exact>
          <OfferScreen/>
        </Route>
        <Route path={AppRoute.SignIn} exact>
          {loggedIn ? <Redirect to={AppRoute.Main} /> : <LoginScreen/>}
        </Route>
        <Route component={NotFoundScreen}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
