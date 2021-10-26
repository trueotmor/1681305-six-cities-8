import { ChangeEventHandler } from 'react';

type StarsInputComponentProps = {
  count : number;
  checked : boolean;
  onChange : ChangeEventHandler<HTMLInputElement>;
}

function StarsInputComponent({count, checked, onChange} : StarsInputComponentProps): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden"
        name="rating"
        value={`${count}`}
        id={`${count}-stars`}
        type="radio"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default StarsInputComponent;
