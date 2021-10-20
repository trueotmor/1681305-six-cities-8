import PlaceCardComponent from './place-card-component';
import {Offer} from '../../types/offer';

type CardsListComponentProps = {
  offers : Offer[];
}

function CardsListComponent({offers} : CardsListComponentProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer, id) => {
          const keyValue = `${id}-${offer.id}`;
          return (
            <PlaceCardComponent key = {keyValue} offer = {offer} id = {id}/>
          );
        })
      }
    </div>);
}

export default CardsListComponent;
