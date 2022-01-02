import { configureStore } from "@reduxjs/toolkit";
import cardReducer from '../slice'

export default configureStore({
  reducer: {
    cards: cardReducer,
  },
});