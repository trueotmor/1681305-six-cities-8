import { NameSpace } from '../../consts';
import { State } from '../../types/state';

export const getSelectedOffer = (state: State): number | null => state[NameSpace.main].selectedID;
