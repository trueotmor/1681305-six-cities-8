import HeaderComponent from '../header-component/header-component';
import MainTabsComponent from './main-tabs-component';
import { useSelector } from 'react-redux';
import { getIsDataLoaded, getOffers } from '../../store/main-data/selectors';
import classNames from 'classnames';
import Loading from '../loading/loading';
import MainCitiesComponent from './main-cities-component';
import MainEmptyCitiesComponent from './main-empty-cities-component';

function MainScreen(): JSX.Element {
  const isDataLoaded = useSelector(getIsDataLoaded);
  const offers = useSelector(getOffers);
  const pageClass = classNames('page__main page__main--index', {'page__main--index-empty' : !offers.length});

  if (!isDataLoaded) {
    return <Loading/>;
  }

  return (
    <div className="page page--gray page--main">
      <HeaderComponent/>

      <main className={pageClass}>
        <h1 className="visually-hidden">Cities</h1>
        <MainTabsComponent/>
        {
          offers.length
            ? <MainCitiesComponent/>
            : <MainEmptyCitiesComponent/>
        }
      </main>
    </div>
  );
}

export default MainScreen;
