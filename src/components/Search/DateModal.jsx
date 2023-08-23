import React from 'react';
import { useState, useEffect } from 'react';
import styles from './DateModal.module.css';
import { PropertiesContext } from './ListProperties';
import { useContext } from 'react';

export const DateModal = ({ closeDate, isDateOpen, setDatePlaceholder }) => {
  const { startDate, endDate, handleStart, handleEnd } =
    useContext(PropertiesContext);

  //get day month and year from date format
  function getDate(dateString) {
    // Parse the input date string as a Date object
    var date = new Date(dateString);

    // Get the day part from the Date object
    var day = date.getDate();

    // Format the day value to always have two digits
    var formattedDay = (day < 10 ? '0' : '') + day;

    // Get the abbreviated month name from the Date object
    var abbreviatedMonth = date.toLocaleString('default', { month: 'short' });

    // Get the last two digits of the year
    var year = date.getFullYear().toString().slice(-2);

    return {
      day: formattedDay,
      month: abbreviatedMonth,
      year: year,
    };
  }

  // update final placeholder depending on date change everytime
  useEffect(() => {
    if (
      startDate !== '' &&
      endDate !== '' &&
      new Date(startDate) >= new Date() &&
      new Date(startDate) <= new Date(endDate)
    ) {
      setDatePlaceholder(
        `${getDate(startDate).day} ${getDate(startDate).month} - ${
          getDate(endDate).day
        } ${getDate(endDate).month}`
      );
    }
  }, [startDate, endDate]);

  // done button fucntion
  const handleDone = () => {
    if (startDate && endDate) {
      closeDate();
    }
  };

  return (
    <>
      {isDateOpen && (
        <div className={styles.date_modal}>
          <span className={styles.close} onClick={closeDate}>
            &times;
          </span>
          <div className={styles.date_container}>
            <div className={styles.start}>
              <label htmlFor='start-date'>Start Date</label>
              <input
                type='date'
                id='start-date'
                name='start-date'
                onChange={handleStart}
                value={startDate}
              />
            </div>
            <div className={styles.end}>
              <label htmlFor='end-date'>End Date</label>
              <input
                type='date'
                id='end-date'
                name='end-date'
                onChange={handleEnd}
                value={endDate}
              />
            </div>
          </div>
          <button className={styles.done} onClick={handleDone}>
            Done
          </button>
        </div>
      )}
    </>
  );
};
