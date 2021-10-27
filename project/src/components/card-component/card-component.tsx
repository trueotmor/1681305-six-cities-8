import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { CardClassProps } from '../../types/card';

type PlaceCardProps = {
  offer : Offer;
  cardClass : CardClassProps;
  updateData? : ((value: string) => void) | undefined;
}

function CardComponent({offer, cardClass , updateData} : PlaceCardProps): JSX.Element {
  const {isPremium, price, title, type, previewImage, isFavorite, rating, uniqueOfferID} = offer;
  const {articleClass, imageWrapperClass, cardInfoClass, imageSize} = cardClass;
  const iconBookmark = isFavorite ? <use xlinkHref="#icon-bookmark" fill='#4481c3' stroke='#4481c3'></use> : <use xlinkHref="#icon-bookmark" fill='#ffffff' stroke='#b8b8b8'></use>;
  const [, setHover] = useState<string>('');
  const setState = (state : string) => {
    setHover(state);
    if (updateData) {
      updateData(state);
    }
  };

  return (
    <article className={`${articleClass} place-card`} id={`offer-${uniqueOfferID}`}
      onMouseEnter={()=>{
        setState(uniqueOfferID);
      }}
      onMouseLeave={()=>{
        setState('');
      }}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <Link to={`/offer/${uniqueOfferID}`} >
          <img className="place-card__image" src={previewImage} width={+imageSize.width} height={+imageSize.height} alt="Place"/>
        </Link>
      </div>
      <div className={`{${cardInfoClass}}place-card__info`}>
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
          <Link to={`/offer/${uniqueOfferID}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default CardComponent;
