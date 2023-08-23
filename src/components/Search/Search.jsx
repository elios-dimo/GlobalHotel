import React, { useState } from 'react';
import styles from './Search.module.css';
import { Hotels } from './Hotels';
import { DestModal } from './DestModal';
import { DateModal } from './DateModal';
import { PeopleModal } from './PeopleModal';
import { CiLocationOn } from 'react-icons/ci';
import { MdDateRange } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { useContext } from 'react';
import { PropertiesContext } from './ListProperties';

export const Search = () => {
  // placeholders for destination, date, people that change depending on user input
  const [destPlaceholder, setDestPlaceholder] = useState('Destination');
  const [datePlaceholder, setDatePlaceholder] = useState('Choose Dates');
  const [pplPlaceholder, setPplPlaceholder] = useState('1 visitor, 1 room');

  // close and open modals for user to enter destination, date and number of people
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isPplOpen, setIsPplOpen] = useState(false);

  const { filteredHotelList } = useContext(PropertiesContext);

  //all modal functions
  const openDest = () => {
    if (isPplOpen === true) {
      setIsDestOpen(false);
    } else {
      setIsDestOpen(true);
    }
  };

  const closeDest = () => {
    setIsDestOpen(false);
  };
  const openDate = () => {
    if (isPplOpen === true) {
      setIsDateOpen(false);
    } else {
      setIsDateOpen(true);
    }
  };

  const closeDate = () => {
    setIsDateOpen(false);
  };
  const openPpl = () => {
    setIsPplOpen(true);
  };

  const closePpl = () => {
    setIsPplOpen(false);
  };

  return (
    <>
      <div className={styles.search_container}>
        <h2 className={styles.search_title}>Find your hotel!</h2>
        <div className={styles.input_container}>
          {/* destination input */}
          <CiLocationOn className={styles.dest_icon} />
          <input
            type='text'
            className={styles.destination}
            placeholder={destPlaceholder}
            value={destPlaceholder}
            onClick={openDest}
          />

          {/* date input */}
          <MdDateRange className={styles.date_icon} />
          <input
            type='text'
            className={styles.date}
            placeholder={datePlaceholder}
            value={datePlaceholder}
            onClick={openDate}
          />

          {/* visitors number */}
          <BsPerson className={styles.ppl_icon} />
          <input
            type='text'
            className={styles.people}
            placeholder={pplPlaceholder}
            value={pplPlaceholder}
            onClick={openPpl}
          />

          {/* search button */}
          <button className={styles.search_but} onClick={filteredHotelList}>
            SEARCH
          </button>
        </div>

        {/* destination modal control with props */}
        <DestModal
          closeDest={closeDest}
          isDestOpen={isDestOpen}
          setDestPlaceholder={setDestPlaceholder}
        />

        {/* date modal control with props */}
        <DateModal
          closeDate={closeDate}
          isDateOpen={isDateOpen}
          setDatePlaceholder={setDatePlaceholder}
        />

        {/* visitors modal control with props */}
        <PeopleModal
          closePpl={closePpl}
          isPplOpen={isPplOpen}
          setPplPlaceholder={setPplPlaceholder}
        />
      </div>
      <Hotels />
    </>
  );
};
