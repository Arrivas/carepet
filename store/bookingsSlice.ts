import { createSlice } from "@reduxjs/toolkit";
import { BookingsSliceState } from "../pages/_app";

const initialState: BookingsSliceState = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
