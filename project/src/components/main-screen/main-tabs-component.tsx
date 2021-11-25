import { useDispatch, useSelector } from 'react-redux';
import { CityName, SortType } from '../../consts';
import classNames from 'classnames';
import { fetchOffersAction } from '../../store/api-actions';
import { selectCity } from '../../store/action';
import { getCity } from '../../store/main-data/selectors';
import { getArrayFromEnum } from '../../utils/utils';

function MainTabsComponent(): JSX.Element {
  const cities = getArrayFromEnum(CityName);
  const dispatch = useDispatch();
  const city = useSelector(getCity);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((place, id) => {
            const keyValue = `${id}-${place}`;
            const cityClass = classNames('locations__item-link tabs__item', {'tabs__item--active' : city === place});
            return (
              <li className="locations__item" key={keyValue} onClick={(event)=>{
                event.preventDefault();
                dispatch(fetchOffersAction(place, SortType.Popular));
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
