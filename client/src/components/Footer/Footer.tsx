import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <h2 className={styles.footerHeader}>Need help reserving?</h2>
      
      <div className={styles.footerContent}>
        <div className={styles.faqSection}>
          <span>Check the <a href="/about">About</a> page</span>
        </div>

        <div className={styles.divider}>or</div>

        <div className={styles.contactSection}>
          <h3>Contact DLSU Computer Laboratory:</h3>
          <ul>
            <li>email: fake_email@dlsu.edu.ph</li>
            <li>tel. no.: 4200-6767</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;