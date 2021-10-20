type IsPremiumProps = {
  isPremium : boolean;
}

function IsPremiumComponent({isPremium} : IsPremiumProps): JSX.Element {
  if (!isPremium) {
    return <div></div>;
  }

  return (
    <div className="property__mark">
      <span>Premium</span>
    </div>
  );
}

export default IsPremiumComponent;
