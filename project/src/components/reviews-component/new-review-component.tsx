import {useState, ChangeEvent, FormEvent} from 'react';
import StarsInputComponent from './stars-input-component';
import {STARS} from '../../consts';

type NewReviewComponentProps = {
  onComment : (starsState : [number, React.Dispatch<React.SetStateAction<number>>], userText : string)=> void;
}

function NewReviewComponent({onComment}:NewReviewComponentProps): JSX.Element {
  const [userText, setUserText] = useState('');
  const starsState = useState(0);
  const disabled = userText === '' && starsState[0] === 0;

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onComment(starsState, userText);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {new Array(STARS).fill(0).map((count, id) => {
          const keyValue = `${id}-${id}`;
          return (
            <StarsInputComponent key = {keyValue} count = {STARS - id} state = {starsState}/>
          );
        })}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value = {userText}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          const value = target.value;
          setUserText(value);
        }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled = {disabled}>Submit</button>
      </div>
    </form>
  );
}

export default NewReviewComponent;
