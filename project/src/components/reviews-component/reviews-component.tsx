import { AuthorizationStatus } from '../../consts';
import { CommentsGet } from '../../types/comment-get';
import { CommentPost } from '../../types/comment-post';
import NewReviewComponent from './new-review-component';
import ReviewComponent from './review-component';


type ReviewsComponentProps = {
  reviews : CommentsGet,
  onComment : (review: CommentPost)=> void,
  auth: string,
}

function ReviewsComponent({reviews, onComment, auth}: ReviewsComponentProps): JSX.Element {
  const sortedReviews = [...reviews].slice(0, 10).sort((b, a) => {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  });

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review, id) => {
          const keyValue = `${id} - ${review.id}`;
          return <ReviewComponent key = {keyValue} review = {review}/>;
        })}
      </ul>
      {
        auth===AuthorizationStatus.Auth && <NewReviewComponent onComment = {onComment}/>
      }
    </section>
  );
}

export default ReviewsComponent;
