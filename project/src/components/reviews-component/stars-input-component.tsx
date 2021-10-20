type StarsInputComponentProps = {
  count : number
  state : [number, React.Dispatch<React.SetStateAction<number>>]
}

function StarsInputComponent({count, state} : StarsInputComponentProps): JSX.Element {
  const [userSelect, setUserSelect] = state;
  return (
    <>
      <input className="form__rating-input visually-hidden"
        name="rating"
        value={`${count}`}
        id={`${count}-stars`}
        type="radio"
        checked={userSelect === count}
        onChange={() => {
          setUserSelect(count);
        }}
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
