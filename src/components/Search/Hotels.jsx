
import { useContext } from 'react';
import { PropertiesContext } from './ListProperties';
import styles from './Hotels.module.css';
import { Link } from 'react-router-dom';

export const Hotels = () => {
  const { hotelList } = useContext(PropertiesContext);

  return (
    <div className={styles.searchHotels}>
      <ul className={styles.hotel_list}>
        {hotelList.map((hotel) => (
          <Link
            to={`/Search/${hotel.hotel_id}?name=${encodeURIComponent(
              hotel.hotel_name
            )}`}
          >
            <li key={hotel.hotel_id} className={styles.hotel_info}>
              <img src={hotel.main_photo_url} className={styles.hotelPhoto} />
              <div className={styles.hotelName}> {hotel.hotel_name}</div>
              <p className={styles.hotelPrice}>
                {hotel.min_total_price}
                {hotel.currency_code}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
