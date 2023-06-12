import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadingReducer from "./loadingSlice";
import petServicesReducer from "./petServicesSlice";
import bookingsReducer from "./bookingsSlice";
import clientBookingsReducer from "./clientBookingsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  petServices: petServicesReducer,
  bookings: bookingsReducer,
  clientBookings: clientBookingsReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    petServices: petServicesReducer,
    bookings: bookingsReducer,
    clientBookings: clientBookingsReducer,
    // petServices: apartmentsReducer,
    // booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
