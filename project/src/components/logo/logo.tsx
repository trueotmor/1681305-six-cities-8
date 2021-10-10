import { Link } from 'react-router-dom';

export default function Logo(): JSX.Element {
  return (
    <Link className = 'header__logo' to='/'>
      <div className='header__logo-link'>
        <span className='visually-hidden'>На главную страницу</span>
        <img className='header__logo' src='img/logo.svg' alt='6 cities logo' />
      </div>
    </Link>
  );
}
