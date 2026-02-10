import styles from '../Navbar/Navbar.module.css';

const AdminNavbar = () => {
  const navLinks = [
    { name: 'Back to Login', href: '/' },
    { name: 'Edit Reservation', href: '#' },
    { name: 'Delete Reservation', href: '/delete' },
  ];

  return (
    <nav className={styles.navbar}>
      <div>
        <a href="/home" className={styles.navLink}>DLSU Computer Laboratories (insert logo here)</a>
      </div>
      <div className={styles.linkContainer}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className={styles.navLink}>{link.name}</a>
        ))}
        <div className={styles.profileCircle}></div>
      </div>
    </nav>
  );
};

export default AdminNavbar;