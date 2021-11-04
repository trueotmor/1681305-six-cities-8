import {connect, ConnectedProps} from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { resetCity as resetCityState } from '../../store/action';
import { Actions } from '../../types/action';

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onResetCity : resetCityState,
}, dispatch);

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Logo({onResetCity} : PropsFromRedux): JSX.Element {
  return (
    <Link className='header__logo' to='/' onClick={()=>{
      onResetCity();
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
