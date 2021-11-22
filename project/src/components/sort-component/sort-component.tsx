import { SortTypes } from '../../consts';
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCity, getOffers, getSort } from '../../store/main-data/selectors';
import { loadOffers, selectSortType } from '../../store/action';

function enumKeys<E>(e: E): (keyof E)[] {
  return Object.keys(e) as (keyof E)[];
}

const SORT_TYPES: string[] = [];
for (const key of enumKeys(SortTypes)) {
  const SortType: string = SortTypes[key];
  SORT_TYPES.push(SortType);
}

function SortComponent(): JSX.Element {
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(false);
  const menuClass = classNames('places__options places__options--custom', {'places__options--opened' : menuState});

  const selectedSortType = useSelector(getSort);
  const city = useSelector(getCity);
  const offers = useSelector(getOffers);

  return (
    <form className="places__sorting" action="#" method="get"
      onMouseLeave={()=>{
        setMenuState(false);
      }}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={()=>{
        setMenuState(!menuState);
      }}
      >
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className = {menuClass}>
        {
          SORT_TYPES.map((sortType, id) => {
            const placeOptionClass = classNames('places__option', {'places__option--active': selectedSortType === sortType});
            const keyValue = `${sortType}-${id}`;
            return (
              <li key = {keyValue} className={placeOptionClass} tabIndex={0} onClick={()=>{
                dispatch(selectSortType(sortType));
                dispatch(loadOffers({offers, city, sortType}));
              }}
              >{sortType}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
}

export default SortComponent;
