import { AuthorizationStatus, NameSpace } from '../../consts';
import { AuthInfo } from '../../types/auth-info';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): AuthInfo => state[NameSpace.User].user;
