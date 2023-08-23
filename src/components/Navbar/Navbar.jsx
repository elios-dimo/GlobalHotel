import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to='/'>
          Global<span>Hotel</span>
        </Link>
      </div>
      <ul className={styles.sections}>
        {/* <li className={styles.section}>
          <Link to='/'>Home</Link>
        </li> */}
        <li className={styles.section}>
          <Link to='/Search'>Search</Link>
        </li>
        {/* <li className={styles.section}>
          <Link to='/Bookmars'>Bookmars</Link>
        </li> */}
      </ul>
    </nav>
  );
};
