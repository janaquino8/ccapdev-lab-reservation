import styles from './Navbar.module.css';

const Navbar = () => {
  const navLinks = [
    { name: 'Create Reservation', href: '#' },
    { name: 'Edit Reservation', href: '#' },
    { name: 'Previous Reservations', href: '#' },
    { name: 'View Slots', href: '/slots' },
    { name: 'Search', href: '#' },
  ];

  return (
    <nav className={styles.navbar}>
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