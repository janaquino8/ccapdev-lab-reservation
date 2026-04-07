import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import blankImage from '../../assets/blank-dp.png';
import dlsuLABS from '../../assets/dlsulabs.png'

interface UserProfile {
  username: string;
  givenName: string;
  lastName: string;
  profilePicture: string;
}

interface SearchResult {
  username: string;
  givenName: string;
  lastName: string;
  profilePicture: string;
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        console.log(user)
      } else {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener('userProfileUpdated', loadUser);

    return () => {
      window.removeEventListener('userProfileUpdated', loadUser);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        setIsSearchOpen(false);
        return;
      }

      try {
        const response = await fetch(`/users/searchusers?q=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Backend returned:", data);
          setSearchResults(data);
          setIsSearchOpen(true);
        }
      } catch (error) {
        console.error("Failed to fetch search results", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Create Reservation', href: '/create' },
    { name: 'Edit Reservation', href: '/edit' },
    { name: 'View Slots', href: '/view' },
  ];

  const handleSignOut = async () => {
    console.log("Signing out...");
    
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error("Error logging out from server:", error);
    } finally {
      localStorage.removeItem('user');
      navigate('/');
    }
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

        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search users..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => { if (searchResults.length > 0) setIsSearchOpen(true) }}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)} 
          />
          
          {isSearchOpen && searchResults.length > 0 && (
            <div className={styles.searchResultsDropdown}>
              {searchResults.map((result) => (
                <div 
                  key={result.username} 
                  className={styles.searchResultItem}
                  onClick={() => {
                    setSearchQuery('');
                    console.log(result)
                    console.log(user)

                    if (user?.username === result.username) {
                      navigate('/viewprofile')
                    } else {
                      navigate(`/profile/${result.username}`)
                    }
                  }}
                >
                  <img 
                    src={result.profilePicture || blankImage} 
                    alt="profile" 
                    className={styles.searchResultImage} 
                  />
                  <span>{result.givenName} {result.lastName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

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