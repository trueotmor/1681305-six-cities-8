import { Offer } from '../../types/offer';
import CardComponent from '../card-component/card-component';

type FavoritesItemComponentProps = {
  offers : Offer[];
  city : string;
}

function FavoritesItemComponent({offers, city}: FavoritesItemComponentProps): JSX.Element {
  const cardClass = {
    articleClass : 'favorites__card',
    imageWrapperClass : 'favorites__image-wrapper',
    cardInfoClass : 'favorites__card-info',
    imageSize : {width : 150, height : 110},
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer, id) => {
          const keyValue = `${id}-${offer}`;
          return (
            <CardComponent key={keyValue} offer={offer} cardClass={cardClass}/>
          );
        })}
      </div>
    </li>
  );
}

export default FavoritesItemComponent;
