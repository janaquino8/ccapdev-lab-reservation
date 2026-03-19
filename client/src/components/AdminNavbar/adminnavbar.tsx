import styles from './AdminNavbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import blankImage from '../../assets/blank-dp.png';
import dlsuLABS from '../../assets/dlsulabs.png'

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/admin/home' },
    { name: 'Create Reservation', href: '/admin/create' },
    { name: 'Edit Reservation', href: '/admin/edit' },
    { name: 'Delete Reservation', href: '/admin/delete' },
  ];

  const handleSignOut = () => {
    console.log("Signing out...");
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <a href="/admin/home" className={styles.navLink}><img src={dlsuLABS} alt="Logo" /></a>
      </div>
      <div className={styles.linkContainer}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className={styles.navLink}>{link.name}</a>
        ))}
        <div
          className={styles.profileCircle}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img 
            src={blankImage}
          />
        </div>

          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <button onClick={handleSignOut} className={styles.signOutBtn}>
                Sign Out
              </button>
            </div>
          )}
      </div>
    </nav>
  );
};

export default AdminNavbar;