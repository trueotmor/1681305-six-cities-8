import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Offer} from '../../types/offer';
type NearPlaceComponentProps = {
  offer : Offer;
  id : number;
}

function NearPlaceComponent({offer, id} : NearPlaceComponentProps): JSX.Element {
  const {price, rating, type, title, images, isFavorite} = offer;
  const [image] = images;
  const iconBookmark = isFavorite ? <use xlinkHref="#icon-bookmark" fill='#4481c3' stroke='#4481c3'></use> : <use xlinkHref="#icon-bookmark" fill='#ffffff' stroke='#b8b8b8'></use>;

  const [, setHover] = useState(false);

  return (
    <article className="near-places__card place-card"
      onMouseEnter={()=>{
        setHover(true);}}
      onMouseLeave={()=>{
        setHover(false);}}
    >
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`} >
          <img className="place-card__image" src={image} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              {iconBookmark}
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{'width': `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} >{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default NearPlaceComponent;
