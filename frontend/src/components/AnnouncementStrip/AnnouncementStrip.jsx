import { Link } from 'react-router-dom';
import styles from './AnnouncementStrip.module.css';

const MESSAGE =
  'Launching our first commercial intelligence product this Spring — Built on the Anoryx Autonomous Intelligence Infrastructure ';

export default function AnnouncementStrip() {
  return (
    <Link to="/products" className={styles.strip} aria-label="Product launch announcement - view products">
      <span className={styles.stripShimmer} aria-hidden />
      <span className={styles.stripPulse} aria-hidden />
      <span className={styles.stripContent}>
        <span className={styles.stripDot} aria-hidden />
        <span className={styles.stripTextWrap}>
          <span className={styles.stripTextInner}>
            <span className={styles.stripText}>{MESSAGE}</span>
            <span className={styles.stripText} aria-hidden>{MESSAGE}</span>
          </span>
        </span>
      </span>
    </Link>
  );
}
