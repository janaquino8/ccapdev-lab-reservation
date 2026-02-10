import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import johnPork from '../../assets/john-pork.jpg';

const ProfileNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/home' },
  ];

  const handleSignOut = () => {
    console.log("Signing out...");
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate('/viewprofile');
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <a href="/home" className={styles.navLink}>DLSU Computer Laboratories (insert logo here)</a>
      </div>
      <div className={styles.linkContainer}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className={styles.navLink}>{link.name}</a>
        ))}
        <div
          className={styles.profileCircle}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
            <img src={johnPork} alt="John Pork" />
        </div>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button onClick={handleViewProfile} className={styles.viewProfileBtn}>
              View Profile
            </button>
            <button onClick={handleSignOut} className={styles.signOutBtn}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ProfileNavbar;