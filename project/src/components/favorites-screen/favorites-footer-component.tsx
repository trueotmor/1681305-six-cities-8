import { Link } from 'react-router-dom';
import { AppRoute, CitiesNames, SortTypes } from '../../consts';
import { selectCity, selectSortType } from '../../store/action';
import { fetchOffersAction } from '../../store/api-actions';
import { useDispatch } from 'react-redux';

function FavoritesFooterComponent(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Main} onClick={()=>{
        dispatch(fetchOffersAction(CitiesNames.Paris, SortTypes.Popular));
        dispatch(selectCity(CitiesNames.Paris));
        dispatch(selectSortType(SortTypes.Popular));
      }}
      >
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  );
}

export default FavoritesFooterComponent;
