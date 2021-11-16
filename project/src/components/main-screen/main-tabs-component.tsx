import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { Actions, ThunkAppDispatch } from '../../types/action';
import { selectCity, offersByCity } from '../../store/action';
import { CitiesNames, SortTypes } from '../../consts';
import classNames from 'classnames';
import { fetchOffersAction } from '../../store/api-actions';
import { store } from '../../index';

const mapStateToProps = ({offers, city} : State) => ({
  offers,
  city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onCitySelect : selectCity,
  onCitySelectGetOffers : offersByCity,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function enumKeys<E>(e: E): (keyof E)[] {
  return Object.keys(e) as (keyof E)[];
}

const CITIES: string[] = [];
for (const key of enumKeys(CitiesNames)) {
  const CityName: string = CitiesNames[key];
  CITIES.push(CityName);
}

function MainTabsComponent(props : PropsFromRedux): JSX.Element {
  const {onCitySelect, city} = props;
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
                (store.dispatch as ThunkAppDispatch)(fetchOffersAction(place, SortTypes.Popular));
                onCitySelect(place);
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

export { MainTabsComponent };
export default connector( MainTabsComponent );
