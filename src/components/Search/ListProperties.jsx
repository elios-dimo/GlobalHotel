import React, { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Create a new context for filters
export const PropertiesContext = createContext();

// Create a provider component to wrap the app and manage the filter state
export const PropertiesProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [destId, setDestId] = useState('');
  const [destType, setDestType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hotelList, setHotelList] = useState([]);
  const [hotelsDisplay, setHotelsDisplay] = useState(false);

  // function for toggling hotels results and visibility
  const hotelsListDisplay = () => {
    setHotelsDisplay(!hotelsDisplay);
    console.log('search clicked');
  };

  //load from Redux state
  const visitors = useSelector((state) => state.visitors.visitors);
  const totalAdults = visitors.reduce(
    (sum, visitor) => sum + visitor.adults,
    0
  );
  const totalKids = visitors.reduce((sum, visitor) => sum + visitor.kids, 0);
  const totalPersons = totalAdults + totalKids;
  const totalRooms = visitors.length;

  //functions
  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleStart = (e) => {
    setStartDate(e.target.value);
  };

  const handleEnd = (e) => {
    setEndDate(e.target.value);
  };

  // Calculate the number of rooms with visitors
  const finalPplRooms = () => {
    let finRooms;
    if (totalRooms === 1) {
      finRooms = 1;
    } else {
      const noPpl = visitors.filter(
        (visitor) => visitor.adults === 0 && visitor.kids === 0
      ).length;
      finRooms = totalRooms - noPpl;
    }
    return finRooms;
  };

  const finalRooms = finalPplRooms();

  const filteredHotelList = async () => {
    const url = `https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=${startDate}&departure_date=${endDate}&guest_qty=${totalAdults}&dest_ids=${destId}&room_qty=${finalRooms}&search_type=${destType}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'dc37b29e32msh75349aca4eba5c3p1ac6a0jsnd19b27e1be73',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setHotelList(result.result); // Update here to use result.result
      hotelsListDisplay();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PropertiesContext.Provider
      value={{
        query,
        destId,
        destType,
        startDate,
        endDate,
        visitors,
        totalKids,
        totalAdults,
        totalPersons,
        totalRooms,
        handleInput,
        handleStart,
        handleEnd,
        finalPplRooms,
        setDestId,
        setDestType,
        finalRooms,
        hotelList,
        filteredHotelList,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesContext;
