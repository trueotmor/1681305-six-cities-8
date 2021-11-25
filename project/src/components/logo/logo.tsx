import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { SortType } from '../../consts';
import { CityName } from '../../consts';
import { fetchOffersAction } from '../../store/api-actions';
import { selectCity, selectSortType } from '../../store/action';
import { useDispatch } from 'react-redux';

function Logo(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <Link className='header__logo' to={AppRoute.Main} onClick={()=>{
      dispatch(fetchOffersAction(CityName.Paris, SortType.Popular));
      dispatch(selectCity(CityName.Paris));
      dispatch(selectSortType(SortType.Popular));
    }}
    >
      <div className='header__logo-link'>
        <span className='visually-hidden'>На главную страницу</span>
        <img className='header__logo' src='img/logo.svg' alt='6 cities logo' />
      </div>
    </Link>
  );
}

export default Logo;
