import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { AuthInfo } from '../../types/auth-info';
import Logo from '../logo/logo';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getAuthorizationStatus, getUser } from '../../store/user-data/services';

type UserProps = {
  user: AuthInfo | Record<string, never>,
}

function Guest(): JSX.Element {
  return (
    <Link to={AppRoute.SignIn} className="header__nav-link header__nav-link--profile" >
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__login">Sign in</span>
    </Link>
  );
}

function User({user}: UserProps): JSX.Element {
  const email = user.email;
  return (
    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile" >
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">{email}</span>
    </Link>
  );
}

function HeaderComponent(): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ? <User user={user}/>
                    : <Guest/>
                }
              </li>
              {
                authorizationStatus === AuthorizationStatus.Auth &&
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Main} onClick={(evt) => {
                    evt.preventDefault();
                    logout();
                  }}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
