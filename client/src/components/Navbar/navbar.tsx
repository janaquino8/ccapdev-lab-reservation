import styles from './Navbar.module.css';

const Navbar = () => {
  const navLinks = [
    { name: 'Create Reservation', href: '/create' },
    { name: 'Edit Reservation', href: '/edit' },
    { name: 'Previous Reservations', href: '/previous' },
    { name: 'View Slots', href: '/view' },
    { name: 'Search', href: '#' },
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

export default Navbar;