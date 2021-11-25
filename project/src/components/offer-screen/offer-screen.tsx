import HeaderComponent from '../header-component/header-component';
import HostComponent from './host-component';
import ReviewsComponent from '../reviews-component/reviews-component';
import CardComponent from '../card-component/card-component';
import MapComponent from '../map-component/map-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchFavoritesAction, fetchNearPlacesAction, fetchReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router';
import Loading from '../loading/loading';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useEffect } from 'react';
import { requireDataUnload } from '../../store/action';
import { store } from '../../index';
import { AppRoute, OFFER_SCREEN_IMAGES_MAX_INDEX, OFFER_SCREEN_IMAGES_START_INDEX, RATING_BAR_FACTOR } from '../../consts';
import { getComments, getCurrentOffer, getIsDataLoaded, getNearPlaces } from '../../store/main-data/selectors';
import { getAuthorizationStatus } from '../../store/user-data/services';
import { CommentPost } from '../../types/comment-post';

type Params = {
  id: string,
}

function OfferScreen(): JSX.Element {
  const dispatch = useDispatch();
  const { id: currentId }: Params = useParams();
  const currentOffer = useSelector(getCurrentOffer);
  const isDataLoaded = useSelector(getIsDataLoaded);
  const comments = useSelector(getComments);
  const nearPlaces = useSelector(getNearPlaces);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const {isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description, images} = currentOffer;
  const iconBookmark = isFavorite ? <use xlinkHref="#icon-bookmark" fill='#4481c3' stroke='#4481c3'></use> : <use xlinkHref="#icon-bookmark"fill='#ffffff' stroke='#b8b8b8'></use>;
  const cardClass = {
    articleClass : 'near-places__card',
    imageWrapperClass : 'near-places__image-wrapper',
    imageSize : {width : 260, height : 200},
  };

  useEffect(() => {
    store.dispatch(requireDataUnload());
    store.dispatch(fetchCurrentOfferAction(+currentId))
      .then(() => {
        store.dispatch(fetchNearPlacesAction(+currentId));
        store.dispatch(fetchCommentsAction());
      });
  }, [currentId]);

  if (!isDataLoaded) {
    return <Loading/>;
  }

  if (!('id' in currentOffer)) {
    return <NotFoundScreen/>;
  }

  const onComment = (review: CommentPost) => {
    dispatch(fetchReviewAction(review));
  };

  const onBookmarkClick = () => {
    store.dispatch(fetchFavoritesAction(+currentId, isFavorite))
      .then(()=>{
        dispatch(fetchCurrentOfferAction(+currentId));
      });
  };


  return (
    <div className="page">
      <HeaderComponent/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(OFFER_SCREEN_IMAGES_START_INDEX, OFFER_SCREEN_IMAGES_MAX_INDEX).map((image, id) => {
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
              {isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button" onClick={onBookmarkClick}>
                  <svg className="property__bookmark-icon" width="31" height="33">
                    {iconBookmark}
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{'width': `${rating * RATING_BAR_FACTOR}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating.toFixed(1)}</span>
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
                  {goods.map((good) => (
                    <li key = {good} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <HostComponent host = {host} description = {description}/>
              <ReviewsComponent reviews = {comments} onComment = {onComment} auth = {authorizationStatus}/>
            </div>
          </div>
          <section className="property__map map">
            <MapComponent offers = {nearPlaces} currentPoint = {currentOffer}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              { nearPlaces.map((item) => (
                <CardComponent key={item.id} offer={item} cardClass={cardClass} screen={AppRoute.Room}/>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;

