import {Switch, Route, BrowserRouter} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';

import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import LoginScreen from '../login-screen/login-screen';
import OfferScreen from '../offer-screen/offer-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

import { Offer } from '../../types/offer';
import {CommentGet} from '../../types/comment-get';

type AppScreenProps = {
  offers : Offer[];
  reviews : CommentGet[];
}

function App({offers, reviews}:AppScreenProps): JSX.Element {
  const [offer] = offers;
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainScreen offers = {offers}/>
        </Route>
        <PrivateRoute path={AppRoute.Favorites} exact render={()=> <FavoritesScreen offers = {offers}/>} authorizationStatus={AuthorizationStatus.Auth}/>
        <Route path={AppRoute.Room} exact>
          <OfferScreen offer = {offer} offers = {offers} reviews = {reviews} onComment={() => {
            throw new Error('Function \'onAnswer\' isn\'t implemented.');
          }}
          />
        </Route>
        <Route path={AppRoute.SignIn} exact component={LoginScreen}/>
        <Route component={NotFoundScreen}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;


