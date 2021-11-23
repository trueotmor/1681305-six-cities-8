import { AuthorizationStatus } from '../consts';
import { Offers } from '../types/offers';

export const getRandomInteger = (a = 0, b = 1):number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (min : number, max : number):number => Math.random() * (max - min) + min;


export function getRndArr<T> (anyItarable : T[], maxLength : number, minLength : number) : T[] {
  const clonedData = Object.assign([], anyItarable);
  const result : T[] = [];

  if (maxLength > 1) {
    if (minLength < maxLength) {
      maxLength = getRandomInteger(minLength, maxLength);
    } else {
      maxLength = minLength;
    }
  }

  while (result.length < maxLength) {
    const elementRndIndex = getRandomInteger(0, clonedData.length - 1);
    const randomElement = clonedData[elementRndIndex];

    if (!result.includes(randomElement)) {
      result.push(randomElement);
    }
  }
  return result;
}

export function getRandomElement<T> (iterable : Set<T>) :T {
  const clonedData = [...iterable];
  const randomIndex = Math.floor(Math.random() * clonedData.length);
  const result = clonedData[randomIndex];
  return result;
}

export const getBoolean = () : boolean => Boolean(getRandomInteger(0, 1));

export const getOffersByCity = (offers : Offers ,city  = 'Paris', sortType = 'Popular') : Offers => {
  const cityOffers = offers.filter((el) => el.city.name === city);
  switch (sortType) {
    case 'Popular' :
      return cityOffers;
    case 'Price: low to high' :
      return cityOffers.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    case 'Price: high to low' :
      return cityOffers.sort((b, a) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    case 'Top rated first' :
      return cityOffers.sort((b, a) => {
        if (a.rating > b.rating) {
          return 1;
        }
        if (a.rating < b.rating) {
          return -1;
        }
        return 0;
      });
  }
  return cityOffers;
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

// export const validateEmail = (inputValue: string): boolean => {
//   const validRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//   if (inputValue.match(validRegex)) {
//     console.log("Valid email address!");
//     return true;
//   } else {
//     console.log("Invalid email address!");
//     return false;
//   }
// };
