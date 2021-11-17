import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { ConnectedProps, connect } from 'react-redux';

import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import LoginScreen from '../login-screen/login-screen';
import OfferScreen from '../offer-screen/offer-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import { State } from '../../types/state';
import { isCheckedAuth } from '../../utils/utils';
import browserHistory from '../../browser-history';

const mapStateToProps = ({authorizationStatus, isDataLoaded}: State) => ({
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, isDataLoaded} = props;
  if (isCheckedAuth(authorizationStatus) && !isDataLoaded) {
    return (
      <LoadingScreen/>
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
        <Route path={AppRoute.SignIn} exact component={LoginScreen}/>
        <Route component={NotFoundScreen}/>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);


