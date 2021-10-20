import { Offer } from '../../types/offer';
import HeaderComponent from '../header-component/header-component';
import IsPremiumComponent from './ispremium-component';
import HostComponent from './host-component';
import ReviewsComponent from '../reviews-component/reviews-component';
import NearPlaceComponent from './near-places-component';
import { CommentGet } from '../../types/comment-get';
import { getRndArr } from '../../utils/utils';

type OfferScreenProps = {
  offer : Offer;
  offers : Offer[];
  reviews : CommentGet[];
  onComment : () => void;
}

function OfferScreen({offer, offers, reviews, onComment}:OfferScreenProps): JSX.Element {
  const {isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;
  const iconBookmark = isFavorite ? <use xlinkHref="#icon-bookmark" fill='#4481c3' stroke='#4481c3'></use> : <use xlinkHref="#icon-bookmark"fill='#ffffff' stroke='#b8b8b8'></use>;
  const ratingNumbers = (rating / 20).toFixed(1);
  const nearPlaces = getRndArr([...offers], 3, 3);
  return (
    <div className="page">
      <HeaderComponent/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((image, id) => {
                const keyValue = `${id} - ${image}`;
                return (
                  <div key={keyValue} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Studio"/>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <IsPremiumComponent isPremium = {isPremium}/>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    {iconBookmark}
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{'width': `${rating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{ratingNumbers}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, id) => {
                    const keyValue = `${id}-${good}`;
                    return (
                      <li key = {keyValue} className="property__inside-item">
                        {good}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <HostComponent host = {host} description = {description}/>
              <ReviewsComponent reviews = {reviews} onComment = {onComment}/>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              { nearPlaces.map((item, id) => {
                const keyValue = `${id} - ${item}`;
                return (
                  <NearPlaceComponent key = {keyValue} offer = {item} id = {id}/>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
