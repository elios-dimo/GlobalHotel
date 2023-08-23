import React, { useEffect, useState } from 'react';
import styles from './HotelDescription.module.css';
import { Link } from 'react-router-dom';

export const HotelDescription = ({ hotelId }) => {
  const [description, setDescription] = useState([]);
  useEffect(() => {
    const hotelDesc = async () => {
      const url = `https://apidojo-booking-v1.p.rapidapi.com/properties/get-description?hotel_ids=${hotelId}&languagecode=en-us`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            'dc37b29e32msh75349aca4eba5c3p1ac6a0jsnd19b27e1be73',
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('Description:', result);
        setDescription(result);
      } catch (error) {
        console.error(error);
      }
    };

    hotelDesc();
  }, [hotelId]);

  return (
    <>
      <div className={styles.description}>
        <div className={styles.desc}>
          {description.map((desc) => desc.description)}
        </div>
      </div>
      <Link to='/Search'>
        <button className={styles.back}>BACK</button>
      </Link>
    </>
  );
};
