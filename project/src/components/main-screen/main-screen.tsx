import {useState } from 'react';
import HeaderComponent from '../header-component/header-component';
import MainTabsComponent from './main-tabs-component';
import CardListComponent from './cards-list-component';

import { Offer } from '../../types/offer';
import Map from '../map-component/map-component';

type MainScreenProps = {
  offers : Offer[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<string | undefined>(undefined);
  function updateData (value : string) {
    return setSelectedPoint(value);
  }
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
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CardListComponent offers = {offers} updateData = {updateData}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers = {offers} selectedPoint = {selectedPoint}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
