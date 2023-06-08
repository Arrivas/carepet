import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadingReducer from "./loadingSlice";
import petServicesReducer from "./petServicesSlice";
import bookingsReducer from "./bookingsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  petServices: petServicesReducer,
  bookings: bookingsReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    petServices: petServicesReducer,
    bookings: bookingsReducer,
    // petServices: apartmentsReducer,
    // booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
