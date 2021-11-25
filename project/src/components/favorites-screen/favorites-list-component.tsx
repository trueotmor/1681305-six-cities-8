import { Offers } from '../../types/offers';
import FavoritesItemComponent from './favorites-item-component';

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

export default FavoritesListComponent;
