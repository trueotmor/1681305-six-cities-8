import { Location } from './location';
import { User } from './user';

export type Offer = {
  uniqueOfferID? : string;
  bedrooms : number;
  city : {
    location : Location;
    name : string;
  };
  description : string;
  goods : string[];
  host : User;
  id : number;
  images : string[];
  isFavorite : boolean;
  isPremium : boolean;
  location : Location;
  maxAdults : number;
  previewImage? : string;
  price : number;
  rating : number;
  title : string;
  type : string;
};
