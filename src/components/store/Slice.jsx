import { createSlice } from '@reduxjs/toolkit';

// Create a slice for managing visitor data
const visitorsSlice = createSlice({
  name: 'visitors', // Name of the slice
  initialState: {
    visitors: [{ room: 1, adults: 1, kids: 0 }], // Initial state with a single visitor
  },
  reducers: {
    // Action for adding a new room
    addRoom: (state, action) => {
      const newRoom = action.payload;
      if (newRoom) {
        const roomNr = state.visitors.length + 1;
        state.visitors.push({
          ...newRoom,
          room: roomNr,
        });
      }
    },
    // Action for removing a room
    removeRoom: (state, action) => {
      const roomNrToRemove = action.payload;
      state.visitors = state.visitors.filter(
        (visitor) => visitor.room !== roomNrToRemove
      );
      // Decrement room numbers for remaining rooms
      state.visitors.forEach((visitor) => {
        if (visitor.room > roomNrToRemove) {
          visitor.room -= 1;
        }
      });
    },
    // Action for incrementing the number of adults in a room
    incrementAdults: (state, action) => {
      const { id } = action.payload;
      const visitor = state.visitors.find((visitor) => visitor.room === id);
      if (visitor && visitor.adults < 25) {
        visitor.adults += 1;
      }
    },
    // Action for decrementing the number of adults in a room
    decrementAdults: (state, action) => {
      const { id } = action.payload;
      const visitor = state.visitors.find((visitor) => visitor.room === id);
      if (visitor && visitor.adults > 1) {
        visitor.adults -= 1;
      }
    },
    // Action for incrementing the number of kids in a room
    incrementKids: (state, action) => {
      const { id } = action.payload;
      const visitor = state.visitors.find((visitor) => visitor.room === id);
      if (visitor) {
        visitor.kids += 1;
      }
    },
    // Action for decrementing the number of kids in a room
    decrementKids: (state, action) => {
      const { id } = action.payload;
      const visitor = state.visitors.find((visitor) => visitor.room === id);
      if (visitor && visitor.kids > 0) {
        visitor.kids -= 1;
      }
    },
  },
});

// Export individual actions and the reducer
export const {
  addRoom,
  removeRoom,
  incrementAdults,
  decrementAdults,
  incrementKids,
  decrementKids,
} = visitorsSlice.actions;

export default visitorsSlice.reducer;
