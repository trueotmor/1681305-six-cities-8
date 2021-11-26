import { ChangeEventHandler } from 'react';
import { FetchStatus } from '../../consts';

type StarsInputComponentProps = {
  count : number,
  checked : boolean,
  onChange : ChangeEventHandler<HTMLInputElement>,
  currentFetchStatus: FetchStatus,
}

function StarsInputComponent({count, checked, onChange, currentFetchStatus} : StarsInputComponentProps): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden"
        name="rating"
        value={`${count}`}
        id={`${count}-stars`}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={currentFetchStatus===FetchStatus.Fetching}
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
