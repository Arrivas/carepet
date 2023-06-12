import { createSlice } from "@reduxjs/toolkit";
import { BookingsSliceState, ClientBookingsSliceState } from "../pages/_app";

const initialState: ClientBookingsSliceState = {
  clientBookings: [],
};

const clientBookingsSlice = createSlice({
  name: "clientBookings",
  initialState,
  reducers: {
    setClientBookings: (state, action) => {
      state.clientBookings = action.payload;
    },
  },
});

export const { setClientBookings } = clientBookingsSlice.actions;
export default clientBookingsSlice.reducer;
