import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { SORT_TYPES } from '../../consts';
import classNames from 'classnames';
import { useState } from 'react';
import { Actions } from '../../types/action';
import { offersByCity, selectSortType } from '../../store/action';

const mapStateToProps = ({offers, selectedSortType, city} : State) => ({
  offers,
  selectedSortType,
  city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onSortChangeType : selectSortType,
  onSortOffers : offersByCity,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SortComponent(props : PropsFromRedux): JSX.Element {
  const [menuState, setMenuState] = useState(false);
  const menuClass = classNames('places__options places__options--custom', {'places__options--opened' : menuState});
  const { selectedSortType, onSortChangeType, onSortOffers, city } = props;

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
          SORT_TYPES.map((type, id) => {
            const placeOptionClass = classNames('places__option', {'places__option--active': selectedSortType === type});
            const keyValue = `${type}-${id}`;
            return (
              <li key = {keyValue} className={placeOptionClass} tabIndex={0} onClick={()=>{
                onSortChangeType(type);
                onSortOffers(city, type);
              }}
              >{type}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
}
export { SortComponent };
export default connector( SortComponent );
