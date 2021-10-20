import {CommentGet} from '../../types/comment-get';
import NewReviewComponent from './new-review-component';
import ReviewComponent from './review-component';


type ReviewsComponentProps = {
  reviews : CommentGet[];
  onComment : () => void;
}

function ReviewsComponent({reviews, onComment}: ReviewsComponentProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review, id) => {
          const keyValue = `${id} - ${review.id}`;
          return <ReviewComponent key = {keyValue} review = {review}/>;
        })}
      </ul>
      <NewReviewComponent onComment = {onComment}/>
    </section>
  );
}

export default ReviewsComponent;
