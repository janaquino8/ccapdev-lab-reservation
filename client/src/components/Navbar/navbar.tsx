import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import blankImage from '../../assets/blank-dp.png';
import dlsuLABS from '../../assets/dlsulabs.png'

interface UserProfile {
  givenName: string;
  lastName: string;
  profilePicture: string;
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Create Reservation', href: '/create' },
    { name: 'Edit Reservation', href: '/edit' },
    { name: 'Previous Reservations', href: '/previous' },
    { name: 'View Slots', href: '/view' },
    { name: 'Search', href: '/search' },
  ];

  const handleSignOut = () => {
    console.log("Signing out...");
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate('/viewprofile');
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <a href="/home" className={styles.navLink}><img src={dlsuLABS} alt="Logo" /></a>
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
            src={user?.profilePicture || blankImage} 
            alt={user ? `${user.givenName}'s profile` : "Profile"} 
          />
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

export default Navbar;