import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { AppRoute } from '../../consts';
import { offersByCity, selectCity } from '../../store/action';
import { Actions, ThunkAppDispatch } from '../../types/action';
import { SortTypes } from '../../consts';
import { CitiesNames } from '../../consts';
import { fetchOffersAction } from '../../store/api-actions';
import { store } from '../../index';

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onCitySelect : selectCity,
  onCitySelectGetOffers : offersByCity,
}, dispatch);

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Logo(props : PropsFromRedux): JSX.Element {
  const {onCitySelect} = props;
  return (
    <Link className='header__logo' to={AppRoute.Main} onClick={()=>{
      (store.dispatch as ThunkAppDispatch)(fetchOffersAction(CitiesNames.Paris, SortTypes.Popular));
      onCitySelect(CitiesNames.Paris);
    }}
    >
      <div className='header__logo-link'>
        <span className='visually-hidden'>На главную страницу</span>
        <img className='header__logo' src='img/logo.svg' alt='6 cities logo' />
      </div>
    </Link>
  );
}

export { Logo };
export default connector( Logo );
