import { useSelector } from 'react-redux';
import { getCity, getOffers } from '../../store/main-data/selectors';
import MapComponent from '../map-component/map-component';
import SortComponent from '../sort-component/sort-component';
import CardsListComponent from './cards-list-component';

function MainCitiesComponent(): JSX.Element {
  const city = useSelector(getCity);
  const offers = useSelector(getOffers);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city}</b>
          <SortComponent/>
          <CardsListComponent/>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <MapComponent offers = {offers}/>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainCitiesComponent;
