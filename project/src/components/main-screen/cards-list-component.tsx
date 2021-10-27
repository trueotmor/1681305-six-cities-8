import CardComponent from '../card-component/card-component';
import { Offer } from '../../types/offer';

type CardsListComponentProps = {
  offers : Offer[];
  updateData : (value: string) => void;
}

function CardsListComponent({offers, updateData} : CardsListComponentProps): JSX.Element {
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
            <CardComponent key = {keyValue} offer = {offer} cardClass = {cardClass} updateData = {updateData}/>
          );
        })
      }
    </div>);
}

export default CardsListComponent;
