export const STARS = 5;

export const RATING_BAR_FACTOR = 100 / STARS;

export const URL_MARKER_DEFAULT = '../img/pin.svg';

export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const COMMENT_MAX_LENGTH = 300;
export const COMMENT_MIN_LENGTH = 50;

export const OFFER_SCREEN_IMAGES_MAX_INDEX = 6;
export const OFFER_SCREEN_IMAGES_START_INDEX = 0;

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

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHight = 'Price: low to high',
  PriceHightToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const DEFAULT_CITY = {
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 13,
  },
  name: CityName.Paris.toString(),
};

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  Main = 'MAIN',
}
