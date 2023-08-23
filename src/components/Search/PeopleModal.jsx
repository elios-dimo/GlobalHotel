import React from 'react';
import styles from './PeopleModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PropertiesContext } from './ListProperties';
import { useContext } from 'react';

import {
  addRoom,
  removeRoom,
  incrementAdults,
  decrementAdults,
  incrementKids,
  decrementKids,
} from '../store/Slice';

export const PeopleModal = ({ closePpl, isPplOpen, setPplPlaceholder }) => {
  const dispatch = useDispatch();
  const { visitors, totalPersons, totalRooms, finalPplRooms } =
    useContext(PropertiesContext);

  // Handlers for adding and removing rooms
  const handleAddRoom = () => {
    if (totalRooms < 5 && totalPersons < 25) {
      dispatch(addRoom({ adults: 0, kids: 0 }));
    }
  };

  const handleRemoveRoom = (room) => {
    if (visitors.length > 1) {
      dispatch(removeRoom(room));
    }
  };

  // Handlers for incrementing and decrementing kids and adults
  const handleKidsIncrement = (visitor) => {
    if (totalPersons < 25) dispatch(incrementKids({ id: visitor.room }));
  };

  const handleKidsDecrement = (visitor) => {
    dispatch(decrementKids({ id: visitor.room }));
  };

  const handleAdultsIncrement = (visitor) => {
    if (totalPersons < 25) dispatch(incrementAdults({ id: visitor.room }));
  };

  const handleAdultsDecrement = (visitor) => {
    dispatch(decrementAdults({ id: visitor.room }));
  };

  // Handler for finalizing and closing the modal
  const handleDone = () => {
    const finalRooms = finalPplRooms();
    // Set placeholder text based on the number of persons and rooms
    if (finalRooms === 1 && totalPersons === 1) {
      setPplPlaceholder(`${totalPersons} visitor ${finalRooms} room`);
    } else if (finalRooms > 1 && totalPersons === 1) {
      setPplPlaceholder(`${totalPersons} visitor ${finalRooms} rooms`);
    } else if (finalRooms === 1 && totalPersons > 1) {
      setPplPlaceholder(`${totalPersons} visitors ${finalRooms} room`);
    } else {
      setPplPlaceholder(`${totalPersons} visitors ${finalRooms} rooms`);
    }
    console.log(`${totalPersons} visitors ${finalRooms} rooms`);
    closePpl();
  };

  return (
    <>
      {isPplOpen && (
        <span className={styles.close} onClick={closePpl}>
          &times;
        </span>
      )}
      {isPplOpen && (
        <div className={styles.ppl_modal}>
          {visitors.map((visitor) => (
            <div className={styles.ppl_container} key={visitor.room}>
              <div className={styles.room}>
                <p>Room {visitor.room}</p>
              </div>
              <div className={styles.visitors}>
                {/* Adults */}
                <div className={styles.adults}>
                  <label htmlFor='adults'>Adults</label>
                  <div className={styles.adult_in}>
                    <button onClick={() => handleAdultsDecrement(visitor)}>
                      -
                    </button>
                    <input type='number' id='adults' value={visitor.adults} />
                    <button onClick={() => handleAdultsIncrement(visitor)}>
                      +
                    </button>
                  </div>
                </div>
                {/* Kids */}
                <div className={styles.kids}>
                  <label htmlFor='kids'>Kids</label>
                  <div className={styles.kid_in}>
                    <button onClick={() => handleKidsDecrement(visitor)}>
                      -
                    </button>
                    <input type='number' id='kids' value={visitor.kids} />
                    <button onClick={() => handleKidsIncrement(visitor)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
              {/* Room operations */}
              <div className={styles.rooms_number}>
                <p className={styles.room_add} onClick={handleAddRoom}>
                  Add room
                </p>
                <p
                  className={styles.room_remove}
                  onClick={() => handleRemoveRoom(visitor.room)}
                >
                  Remove room
                </p>
              </div>
            </div>
          ))}
          <button className={styles.done} onClick={handleDone}>
            Done
          </button>
        </div>
      )}
    </>
  );
};
