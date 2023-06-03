import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadingReducer from "./loadingSlice";
import petServicesReducer from "./petServicesSlice";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  petServices: petServicesReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    petServices: petServicesReducer,
    // petServices: apartmentsReducer,
    // booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
