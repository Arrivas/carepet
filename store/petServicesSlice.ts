import { createSlice } from "@reduxjs/toolkit";
import { PetServiceInitialState, PetService } from "../pages/_app";

const initialState: PetServiceInitialState = {
  value: [] as PetService[],
};

const petServicesSlice = createSlice({
  name: "petServices",
  initialState,
  reducers: {
    setPetServices: (state, action) => {
      state.value = action.payload;
    },
    addPetService: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setPetServices, addPetService } = petServicesSlice.actions;
export default petServicesSlice.reducer;
