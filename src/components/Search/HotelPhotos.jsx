import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './HotelPhotos.module.css';
import { HotelDescription } from './HotelDescription';

export const HotelPhotos = () => {
  const { hotel_id } = useParams();
  const [displayPhoto, setDisplayPhoto] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hotelName = queryParams.get('name');

  useEffect(() => {
    const hotelPhotos = async () => {
      const url = `https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos?hotel_ids=${hotel_id}&languagecode=en-us`;
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
        const photosData = result.data[hotel_id];
        console.log('Data:', photosData);
        const photosArray = photosData.map((photo) => `${photo[4]}`); // Extract URLs and add prefix
        setDisplayPhoto(photosArray);
        console.log('Photos:', photosArray);
      } catch (error) {
        console.error(error);
      }
    };
    hotelPhotos();
  }, [hotel_id]);

  const slideLeft = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slideRight = () => {
    if (currentSlide < displayPhoto.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <>
      <h2>{hotelName}</h2>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          <img
            src={`https://cf.bstatic.com${displayPhoto[currentSlide]}`}
            alt={`Photo ${currentSlide}`}
            className={styles.hotelPh}
          />
        </div>
      </div>
      <div className={styles.carouselNav}>
        <button onClick={slideLeft}>&larr;</button>
        <button onClick={slideRight}>&rarr;</button>
      </div>
      <h3>Description</h3>
      <HotelDescription hotelId={hotel_id} />
    </>
  );
};

export default HotelPhotos;
