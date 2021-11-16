import FavoritesFooterComponent from './favorites-footer-component';
import FavoritesItemComponent from './favorites-item';
import HeaderComponent from '../header-component/header-component';
import {connect, ConnectedProps} from 'react-redux';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';

const mapStateToProps = ({offers}: State) => ({
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type FavoritesListComponentProps = {
  favoritesOffers: Offers,
  favoritesCities: Set<string>,
}

function FavoritesListComponent(props: FavoritesListComponentProps): JSX.Element {
  const {favoritesOffers, favoritesCities} = props;
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {[...favoritesCities].map((city, id) => {
          const favoritesByCity : Offers = [];
          favoritesOffers.forEach((offer)=>{
            if (city === offer.city.name) {
              favoritesByCity.push(offer);
            }
          });
          const keyValue = `${id} - ${city}`;
          return (
            <FavoritesItemComponent key = {keyValue} offers = {favoritesByCity} city = {city}/>
          );
        })}
      </ul>
    </section>
  );
}

function FavoritesEmptyComponent(): JSX.Element {
  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
      </div>
    </section>
  );
}

function FavoritesScreen({offers}: PropsFromRedux): JSX.Element {
  const getFavoritesOffers = () => {
    const favorites : Offers = [];
    offers.forEach((offer) => {
      if (offer.isFavorite) {
        favorites.push(offer);
      }
    });
    return favorites;
  };

  const getFavoritesCities = () : Set<string> => {
    const favoritesCitys : Set<string> = new Set();
    getFavoritesOffers().forEach((offer)=>{
      favoritesCitys.add(offer.city.name);
    });
    return favoritesCitys;
  };

  return (
    <div className="page">
      <HeaderComponent/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            getFavoritesOffers().length > 0
              ? <FavoritesListComponent favoritesOffers={getFavoritesOffers()} favoritesCities={getFavoritesCities()}/>
              : <FavoritesEmptyComponent/>
          }
        </div>
      </main>
      <FavoritesFooterComponent/>
    </div>
  );
}

export { FavoritesScreen };
export default connector(FavoritesScreen);
