import {Link} from 'react-router-dom';
import Logo from '../logo/logo';


function NotFoundScreen(): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
        <h1>404. Page not found</h1>
        <Logo/>
        <Link to="/">Вернуться на главную</Link>
      </div>
    </main>
  );
}

export default NotFoundScreen;
