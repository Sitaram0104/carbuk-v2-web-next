import { configureStore } from "@reduxjs/toolkit";
import bookingInfoSlice from "./slices/bookingInfoSlice";
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bookingInfo: bookingInfoSlice,
  },
});
