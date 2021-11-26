import { ChangeEvent, FormEvent, useEffect } from 'react';
import StarsInputComponent from './stars-input-component';
import { STARS, COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH, FetchStatus } from '../../consts';
import { CommentPost } from '../../types/comment-post';
import { useReview } from '../../hooks/use-review';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewAction } from '../../store/api-actions';
import { getStatus } from '../../store/main-data/selectors';

function NewReviewComponent(): JSX.Element {
  const [review, handleStarsChange, handleCommentChange, handleResetForm] = useReview();
  const currentFetchStatus = useSelector(getStatus);
  const canSubmit = COMMENT_MAX_LENGTH < review.comment.length || review.comment.length < COMMENT_MIN_LENGTH || review.rating === 0 || currentFetchStatus===FetchStatus.Fetching;
  const dispatch = useDispatch();

  const onComment = (comment: CommentPost) => {
    dispatch(fetchReviewAction(comment));
  };

  useEffect(() => {
    currentFetchStatus === FetchStatus.Fetched && handleResetForm();
  }, [currentFetchStatus, handleResetForm]);

  const onChange = ({target} : ChangeEvent<HTMLInputElement>) => {
    handleStarsChange(target.value);};

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onComment(review);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {new Array(STARS).fill(0).map((count, id) => {
          const keyValue = `${id}-${id}`;
          const checked = review.rating === STARS - id;
          return (
            <StarsInputComponent key = {keyValue} count = {STARS - id} checked = {checked} onChange = {onChange} currentFetchStatus={currentFetchStatus}/>
          );
        })}
      </div>
      <textarea className="reviews__textarea form__textarea"
        required
        minLength={COMMENT_MIN_LENGTH}
        maxLength={COMMENT_MAX_LENGTH}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value = {review.comment}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          const value = target.value;
          handleCommentChange(value);

        }}
        disabled={currentFetchStatus===FetchStatus.Fetching}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled = {canSubmit}>Submit</button>
      </div>
    </form>
  );
}

export default NewReviewComponent;
