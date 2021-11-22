import CardComponent from '../card-component/card-component';
import { getOffers } from '../../store/main-data/selectors';
import { useSelector } from 'react-redux';

function CardsListComponent(): JSX.Element {
  const offers = useSelector(getOffers);
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

export default CardsListComponent;
