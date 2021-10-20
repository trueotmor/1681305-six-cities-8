import { AuthInfo } from '../types/auth-info';
import { getRandomInteger, getBoolean } from '../utils/utils';
import { MAX_ID_RANGE, MIN_ID_RANGE, getRandomName, getAvatarUrl } from './offers';

export const authInfo : AuthInfo = {
  avatarUrl : getAvatarUrl(),
  email : '',
  id : getRandomInteger(MIN_ID_RANGE, MAX_ID_RANGE),
  isPro : getBoolean(),
  name : getRandomName(),
  token : '',
};
