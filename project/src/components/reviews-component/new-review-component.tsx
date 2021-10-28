import { useState, ChangeEvent, FormEvent } from 'react';
import StarsInputComponent from './stars-input-component';
import { STARS, COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '../../consts';

type NewReviewComponentProps = {
  onComment : (userSelect : number, userText : string)=> void;
}

function NewReviewComponent({onComment}:NewReviewComponentProps): JSX.Element {
  const [userText, setUserText] = useState('');
  const [userSelect, setUserSelect] = useState<number>(0);
  const disabled = COMMENT_MAX_LENGTH < userText.length || userText.length < COMMENT_MIN_LENGTH || userSelect === 0;
  const onChange = ({target} : ChangeEvent<HTMLInputElement>) => {
    setUserSelect(+target.value);};
  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onComment(userSelect, userText);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {new Array(STARS).fill(0).map((count, id) => {
          const keyValue = `${id}-${id}`;
          const checked = userSelect === STARS - id;
          return (
            <StarsInputComponent key = {keyValue} count = {STARS - id} checked = {checked} onChange = {onChange}/>
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
