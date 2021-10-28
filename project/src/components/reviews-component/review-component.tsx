import dayjs from 'dayjs';
import { CommentGet } from '../../types/comment-get';

type ReviewComponentProps = {
  review : CommentGet;
}

function ReviewComponent({review}: ReviewComponentProps): JSX.Element {
  const {comment, date, rating, user} = review;
  const formattedDate = dayjs(date).format('MMMM YYYY');
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{'width': `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{formattedDate}</time>
      </div>
    </li>

  );
}
export default ReviewComponent;
