import CardComponent from '../card-component/card-component';

import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';

const mapStateToProps = ({offers} : State) => ({
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CardsListComponent(props : PropsFromRedux): JSX.Element {
  const { offers } = props;
  const cardClass = {
    articleClass : 'cities__place-card',
    imageWrapperClass : 'cities__image-wrapper',
    imageSize : {width : 260, height : 200},
  };
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer, id) => {
          const keyValue = `${id}-${offer.id}`;
          return (
            <CardComponent key = {keyValue} offer = {offer} cardClass = {cardClass}/>
          );
        })
      }
    </div>);
}
export { CardsListComponent };
export default connector( CardsListComponent );
