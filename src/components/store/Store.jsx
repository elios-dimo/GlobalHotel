import { configureStore } from '@reduxjs/toolkit';
import visitorsReducer from './Slice'; // Import the cart reducer
import { Provider } from 'react-redux';
// Configure the Redux store using configureStore
const store = configureStore({
  reducer: {
    visitors: visitorsReducer, // Add the cart reducer under the 'cart' key in the store state
  },
});

export default store; // Export the configured Redux store
