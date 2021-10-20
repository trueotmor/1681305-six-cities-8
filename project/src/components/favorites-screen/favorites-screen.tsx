import FavoritesFooterComponent from './favorites-footer-component';
import FavoritesItemComponent from './favorites-item';
import HeaderComponent from '../header-component/header-component';
import {Offer} from '../../types/offer';

type FavoritesScreenProps = {
  offers : Offer[];
}

function FavoritesScreen({offers} : FavoritesScreenProps): JSX.Element {
  const getFavoritesOffers = () => {
    const favorites : Offer[] = [];
    offers.forEach((offer) => {
      if (offer.isFavorite) {
        favorites.push(offer);
      }
    });
    return favorites;
  };

  const getFavoritesCitys = () : Set<string> => {
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
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {[...getFavoritesCitys()].map((city, id) => {
                const favoritesByCity : Offer[] = [];
                getFavoritesOffers().forEach((offer)=>{
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
        </div>
      </main>
      <FavoritesFooterComponent/>
    </div>
  );
}

export default FavoritesScreen;
