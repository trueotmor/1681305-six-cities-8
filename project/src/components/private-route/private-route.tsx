import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../consts';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user-data/services';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, render} = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRoute;
