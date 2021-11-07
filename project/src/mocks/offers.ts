import { Offer } from '../types/offer';
import { getRandomInteger, getRandomElement, getRndArr, getRandomFloat, getBoolean } from '../utils/utils';
import { nanoid } from 'nanoid';


const MIN_LONGITUDE = 4.85;
const MAX_LONGITUDE = 4.95;

const MIN_LATITUDE = 52.35;
const MAX_LATITUDE = 52.39;

export const MIN_ID_RANGE = 1000;
export const MAX_ID_RANGE = 9999;

const MIN_ZOOM_RANGE = 12;
const MAX_ZOOM_RANGE = 14;

const MIN_PRICE = 101;
const MAX_PRICE = 501;

const MIN_RATING = 33;
const MAX_RATING = 100;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 4;

const MIN_ADULTS = 2;
const MAX_ADULTS = 5;

const MIN_IMAGES = 1;
const MAX_IMAGES = 6;

const MIN_GOODS = 2;
const MAX_GOODS = 6;

const OFFERS_LENGHT = 20;

const citys = new Set(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']);
const getRandomCity = ():string => getRandomElement<string>(citys);

const descriptions = new Set (['Located in the heart of the Montparnasse district, this design hotel is just 30 metres from the Raspail Metro stop. Guest rooms are modern and stylish.',
  'Situated just a 5-minute walk from the Cologne Cathedral, this quiet hotel offers a central city location, great transport connections and classically furnished rooms.',
  'Situated in an upscale residential area close to the European Parliament, Hilton Garden Inn Brussels Louise is an ideal hotel for business and leisure travelers.',
  'Best Western Amsterdam is located in Amsterdam West district, just off the A10 city ring and 20 minutes by public transport from the old city centre. Nice place, easy to arrive.',
  'The hotel Barceló Hamburg is an  and surrounded by the best cultural, commercial and technological offer of this modern city. The ideal place for couples and business travellers alike.',
  'Innside Dusseldorf Hafen is a popular choice amongst travelers in Dusseldorf, whether exploring or just passing through. Featuring a complete list of amenities, guests will find their stay at the property a comfortable one. Service-minded staff will welcome and guide you at the Innside Dusseldorf Hafen. Some of the well-appointed guestrooms feature television LCD/plasma screen, internet access – wireless (complimentary), non smoking rooms, air conditioning, heating. The hotel offers various recreational opportunities. No matter what your reasons are for visiting Dusseldorf, Innside Dusseldorf Hafen will make you feel instantly at home.']);
const getRandomDescription = ():string => getRandomElement<string>(descriptions);

const titles = new Set(['Located in the heart of the Montparnasse district',
  '5-minute walk from the Cathedral',
  'Situated in an upscale residential area close to the European Parliament',
  'Nice place, easy to arrive',
  'Urban and avant-garde hotel with an unbeatable location in the centre',
  'Popular choice amongst travelers']);
const getRandomTitle = ():string => getRandomElement<string>(titles);

const types = new Set(['Apartment', 'Hotel', 'Motel', 'All-suites', 'B&B', 'Pop-up']);
const getRandomType = ():string => getRandomElement<string>(types);

const names = new Set(['Eugene', 'Anton', 'Michael', 'Romario', 'Alena', 'Sasha']);
export const getRandomName = ():string => getRandomElement<string>(names);

const goods = ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Wi-Fi', 'Towels', 'Baby seat', 'Fridge'];

const getRandomGoods = () => getRndArr(goods, MAX_GOODS, MIN_GOODS);

export const getAvatarUrl = () : string => `http://picsum.photos/300?r=${Math.random()}`;

const getPreview = () => `http://picsum.photos/260/200?r=${Math.random()}`;

const getRandomImage = () => `http://picsum.photos/260/200?r=${Math.random()}`;
const getImages = () : string[] => Array(getRandomInteger(MIN_IMAGES, MAX_IMAGES)).fill('').map(getRandomImage);

export const getOffers = () : Offer[] => {
  const offers : Offer[] = [];
  for (let actionIndex = 0; actionIndex < OFFERS_LENGHT; actionIndex++){
    const offer: Offer = {
      uniqueOfferID : `${nanoid()}`,
      bedrooms : getRandomInteger(MIN_BEDROOMS, MAX_BEDROOMS),
      city : {
        location : {
          latitude : getRandomFloat(MIN_LATITUDE, MAX_LATITUDE),
          longitude : getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE),
          zoom : getRandomInteger(MIN_ZOOM_RANGE, MAX_ZOOM_RANGE),
        },
        name : getRandomCity(),
      },
      description : getRandomDescription(),
      goods : getRandomGoods(),
      host : {
        avatarUrl : getAvatarUrl(),
        id : getRandomInteger(),
        isPro : getBoolean(),
        name : getRandomName(),
      },
      id : getRandomInteger(MIN_ID_RANGE, MAX_ID_RANGE),
      images : getImages(),
      isFavorite : getBoolean(),
      isPremium : getBoolean(),
      location : {
        latitude : getRandomFloat(MIN_LATITUDE, MAX_LATITUDE),
        longitude : getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE),
        zoom : getRandomInteger(MIN_ZOOM_RANGE, MAX_ZOOM_RANGE),
      },
      maxAdults : getRandomInteger(MIN_ADULTS, MAX_ADULTS),
      previewImage : getPreview(),
      price : getRandomInteger(MIN_PRICE, MAX_PRICE),
      rating : getRandomInteger(MIN_RATING, MAX_RATING),
      title : getRandomTitle(),
      type : getRandomType(),
    };
    offers.push(offer);
  }
  return offers;
};
