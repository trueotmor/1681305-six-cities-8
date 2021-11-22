import { useDispatch, useSelector } from 'react-redux';
import { CitiesNames, SortTypes } from '../../consts';
import classNames from 'classnames';
import { fetchOffersAction } from '../../store/api-actions';
import { selectCity } from '../../store/action';
import { getCity } from '../../store/main-data/selectors';

function enumKeys<E>(e: E): (keyof E)[] {
  return Object.keys(e) as (keyof E)[];
}

const CITIES: string[] = [];
for (const key of enumKeys(CitiesNames)) {
  const CityName: string = CitiesNames[key];
  CITIES.push(CityName);
}

function MainTabsComponent(): JSX.Element {
  const dispatch = useDispatch();
  const city = useSelector(getCity);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((place, id) => {
            const keyValue = `${id}-${place}`;
            const cityClass = classNames('locations__item-link tabs__item', {'tabs__item--active' : city === place});
            return (
              <li className="locations__item" key={keyValue} onClick={(event)=>{
                event.preventDefault();
                dispatch(fetchOffersAction(place, SortTypes.Popular));
                dispatch(selectCity(place));
              }}
              >
                <a className={cityClass} href="/">
                  <span>{place}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default MainTabsComponent;
