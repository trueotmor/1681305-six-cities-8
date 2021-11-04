import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { selectCity, offersByCity } from '../../store/action';
import { CITIES } from '../../consts';
import classNames from 'classnames';

const mapStateToProps = ({city} : State) => ({
  city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onCitySelect : selectCity,
  onCitySelectGetOffers : offersByCity,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainTabsComponent(props : PropsFromRedux): JSX.Element {
  const {onCitySelect, onCitySelectGetOffers, city} = props;
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
                onCitySelect(place);
                onCitySelectGetOffers(place, 'Popular');
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
