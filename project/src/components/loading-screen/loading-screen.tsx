import styles from '../loading-screen/loading-screen.module.scss';
import Loader from 'react-loader-spinner';
function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.wrap}>
      <Loader type="Oval" color="#004080" height={100} width={100} />
    </div>
  );
}

export default LoadingScreen;
