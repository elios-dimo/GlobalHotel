import styles from './DestModal.module.css';
import { CiLocationOn } from 'react-icons/ci';
import React, { useState, useEffect } from 'react';
import { PropertiesContext } from './ListProperties';
import { useContext } from 'react';

export const DestModal = ({ closeDest, isDestOpen, setDestPlaceholder }) => {

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
 

  const { query, handleInput, setDestId, setDestType } =
    useContext(PropertiesContext);
  // update array list of hotels info that appear using asynx function from API depending on user destination input
  useEffect(() => {
    const fetchHotels = async () => {
      const url = `https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${query}`;
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
        setHotels(result);
        console.log(result);
        console.log('Hotels:', hotels);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, [query]);

  // return list of hotels depending on API object properties (name,label,country)
  useEffect(() => {
    if (hotels.length > 0 && query !== '') {
      const filtered = hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.label.toLowerCase().includes(query.toLowerCase()) ||
          hotel.country.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels([]);
    }
  }, [hotels, query]);

  const handleDest = (hotel) => {
    closeDest();
    setDestPlaceholder(hotel.label);
    setDestId(hotel.dest_id);
    setDestType(hotel.dest_type);
  };
  return (
    <div>
      {isDestOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <CiLocationOn className={styles.dest_icon} />
            <input
              type='text'
              className={styles.modal_input}
              placeholder='Enter destination'
              value={query}
              onChange={handleInput}
            />
          </div>
          <span className={styles.close} onClick={closeDest}>
            &times;
          </span>
          <ul className={styles.dest_container}>
            {filteredHotels.map((hotel) => (
              <li
                className={styles.dest_name}
                key={hotel.dest_id}
                onClick={() => handleDest(hotel)}
              >
                {hotel.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
