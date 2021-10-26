import { Offer } from '../../types/offer';

type HostComponentProps = {
  host : Offer['host'];
  description : string;
}

function HostComponent({host, description} : HostComponentProps): JSX.Element {
  const {name, avatarUrl, isPro} = host;
  const pro = isPro ? <span className="property__user-status">Pro</span> : <span></span>;
  const isProAvatar = () => {
    const avatar = <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>;
    const proAvatar = isPro ?
      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">{avatar}</div> :
      <div className="property__avatar-wrapper user__avatar-wrapper">{avatar}</div>;
    return proAvatar;
  };
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        {isProAvatar()}
        <span className="property__user-name">
          {name}
        </span>
        {pro}
      </div>
      <div className="property__description">
        <p className="property__text">
          {description}
        </p>
      </div>
    </div>);
}

export default HostComponent;
