type IsPremiumProps = {
  isPremium : boolean;
  premiumComponentClass : string;
}

function IsPremiumComponent({isPremium, premiumComponentClass} : IsPremiumProps): JSX.Element {
  const premium = isPremium ? <div className={premiumComponentClass}><span>Premium</span></div> : <div></div>;
  return premium;
}

export default IsPremiumComponent;
