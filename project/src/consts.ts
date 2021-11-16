export const STARS = 5;

export const RATING_BAR_FACTOR = 100 / STARS;

export const URL_MARKER_DEFAULT = '../img/pin.svg';

export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const COMMENT_MAX_LENGTH = 300;
export const COMMENT_MIN_LENGTH = 50;

export const ERROR_404 = 404;

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Hotels = '/hotels',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Nearby = '/nearby',
}

export enum CitiesNames {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum SortTypes {
  Popular = 'Popular',
  PriceLowToHight = 'Price: low to high',
  PriceHightToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}
