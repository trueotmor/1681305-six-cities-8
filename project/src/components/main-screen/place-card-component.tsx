import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import IsPremiumComponent from './ispremium-component';

type PlaceCardProps = {
  offer : Offer;
  id : number;
}

function PlaceCardComponent({offer, id} : PlaceCardProps): JSX.Element {
  const {isPremium, price, title, type, previewImage, isFavorite, rating} = offer;
  const iconBookmark = isFavorite ? <use xlinkHref="#icon-bookmark" fill='#4481c3' stroke='#4481c3'></use> : <use xlinkHref="#icon-bookmark"></use>;

  const [, setHover] = useState(false);

  return (
    <article className="cities__place-card place-card" id={`offer-${id}`}
      onMouseEnter={()=>{
        setHover(true);}}
      onMouseLeave={()=>{
        setHover(false);}}
    >
      <IsPremiumComponent isPremium = {isPremium}/>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`} >
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              {iconBookmark}
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{'width': `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCardComponent;
