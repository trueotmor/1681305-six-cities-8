import FavoritesFooterComponent from './favorites-footer-component';
import FavoritesItemComponent from './favorites-item';
import HeaderComponent from '../header-component/header-component';
import { useDispatch, useSelector} from 'react-redux';
import { Offers } from '../../types/offers';
import { getFavoritesOffers, getIsDataLoaded } from '../../store/main-data/selectors';
import { useEffect } from 'react';
import { requireDataUnload } from '../../store/action';
import { fetchFavoritesOffersAction } from '../../store/api-actions';
import Loading from '../loader/loader';

type FavoritesListComponentProps = {
  favoritesOffers: Offers,
  favoritesCities: string[],
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

function FavoritesScreen(): JSX.Element {
  const dispatch = useDispatch();
  const isDataLoaded = useSelector(getIsDataLoaded);
  const favoritesOffers = useSelector(getFavoritesOffers);

  const getFavoritesCities = () : string[] => {
    if (favoritesOffers.length > 0) {
      const favoritesCities : Set<string> = new Set();
      favoritesOffers.forEach((offer)=>{
        favoritesCities.add(offer.city.name);
      });
      return [...favoritesCities];
    } else {
      return [];
    }
  };

  useEffect(() => {
    dispatch(requireDataUnload());
    dispatch(fetchFavoritesOffersAction());
  }, [dispatch]);

  if (!isDataLoaded) {
    return <Loading/>;
  }

  return (
    <div className="page">
      <HeaderComponent/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favoritesOffers.length > 0
              ? <FavoritesListComponent favoritesOffers={favoritesOffers} favoritesCities={getFavoritesCities()}/>
              : <FavoritesEmptyComponent/>
          }
        </div>
      </main>
      <FavoritesFooterComponent/>
    </div>
  );
}

export default FavoritesScreen;
