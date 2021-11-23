import HeaderComponent from '../header-component/header-component';
import MainTabsComponent from './main-tabs-component';
import CardListComponent from './cards-list-component';
import Map from '../map-component/map-component';
import SortComponent from '../sort-component/sort-component';
import { useSelector } from 'react-redux';
import { getCity, getOffers } from '../../store/main-data/selectors';

function MainScreen(): JSX.Element {
  const city = useSelector(getCity);
  const offers = useSelector(getOffers);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <MainTabsComponent/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <SortComponent/>
              <CardListComponent/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers = {offers}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
