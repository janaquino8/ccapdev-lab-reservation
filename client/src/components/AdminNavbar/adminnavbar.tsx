import styles from '../Navbar/Navbar.module.css';

const AdminNavbar = () => {
  const navLinks = [
    { name: 'Edit Reservation', href: '#' },
    { name: 'Delete Reservation', href: '#' },
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

export default AdminNavbar;