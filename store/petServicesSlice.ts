import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [] as any,
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
