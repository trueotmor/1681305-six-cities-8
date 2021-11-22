import { combineReducers } from 'redux';
import { NameSpace } from '../consts';
import { mainData } from './main-data/main-data';
import { mainProcess } from './main-process/main-process';
import { userData } from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.user]: userData,
  [NameSpace.data]: mainData,
  [NameSpace.main]: mainProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
