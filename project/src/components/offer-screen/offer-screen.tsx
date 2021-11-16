import HeaderComponent from '../header-component/header-component';
import HostComponent from './host-component';
import ReviewsComponent from '../reviews-component/reviews-component';
import CardComponent from '../card-component/card-component';
import Map from '../map-component/map-component';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { CommentPost } from '../../types/comment-post';
import { connect, ConnectedProps } from 'react-redux';
import { fetchCommentsAction, fetchCurrentOfferAction, fetchNearPlacesAction, fetchReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useEffect } from 'react';
import { requireDataUnload } from '../../store/action';
import { store } from '../../index';
import { RATING_BAR_FACTOR } from '../../consts';

type Params = {
  id: string,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onComment(review: CommentPost) {
    dispatch(fetchReviewAction(review));
  },
});

const mapStateToProps = ({ currentOffer, nearPlaces, comments, authorizationStatus, isDataLoaded }: State) => ({
  currentOffer,
  nearPlaces,
  comments,
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function OfferScreen(props: PropsFromRedux): JSX.Element {
  const {currentOffer, nearPlaces, comments, authorizationStatus, isDataLoaded, onComment} = props;
  const { id: currentId }: Params = useParams();
  const {isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description, images} = currentOffer;
  const iconBookmark = isFavorite ? <use xlinkHref="#icon-bookmark" fill='#4481c3' stroke='#4481c3'></use> : <use xlinkHref="#icon-bookmark"fill='#ffffff' stroke='#b8b8b8'></use>;
  const cardClass = {
    articleClass : 'near-places__card',
    imageWrapperClass : 'near-places__image-wrapper',
    imageSize : {width : 260, height : 200},
  };

  useEffect(() => {
    store.dispatch(requireDataUnload());
    (store.dispatch as ThunkAppDispatch)(fetchCurrentOfferAction(+currentId))
      .then(() => {
        (store.dispatch as ThunkAppDispatch)(fetchNearPlacesAction(+currentId));
        (store.dispatch as ThunkAppDispatch)(fetchCommentsAction());
      });
  }, [currentId]);

  if (!isDataLoaded) {
    return <LoadingScreen/>;
  }

  if (!('id' in currentOffer)) {
    return <NotFoundScreen />;
  }


  return (
    <div className="page">
      <HeaderComponent/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image, id) => {
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
                <button className="property__bookmark-button button" type="button">
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
            <Map/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              { nearPlaces.map((item) => (
                <CardComponent key={item.id} offer={item} cardClass={cardClass}/>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferScreen };
export default connector(OfferScreen);

