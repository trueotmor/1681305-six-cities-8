import FavoritesFooterComponent from './favorites-footer-component';
import HeaderComponent from '../header-component/header-component';
import { useDispatch, useSelector} from 'react-redux';
import { getFavoritesOffers, getIsDataLoaded } from '../../store/main-data/selectors';
import { useEffect } from 'react';
import { requireDataUnload } from '../../store/action';
import { fetchFavoritesOffersAction } from '../../store/api-actions';
import Loading from '../loading/loading';
import FavoritesListComponent from './favorites-list-component';
import FavoritesEmptyComponent from './favorites-empty-component';

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
            favoritesOffers.length
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
