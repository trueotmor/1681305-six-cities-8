import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { store } from '../../index';
import { AppRoute, CitiesNames, SortTypes } from '../../consts';
import { selectCity } from '../../store/action';
import { fetchOffersAction } from '../../store/api-actions';
import { Actions, ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';

const mapStateToProps = ({offers, city} : State) => ({
  city,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onCitySelect : selectCity,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesFooterComponent(props: PropsFromRedux): JSX.Element {
  const {onCitySelect} = props;
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Main} onClick={()=>{
        (store.dispatch as ThunkAppDispatch)(fetchOffersAction(CitiesNames.Paris, SortTypes.Popular));
        onCitySelect(CitiesNames.Paris);
      }}
      >
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  );
}

export { FavoritesFooterComponent };
export default connector(FavoritesFooterComponent);
