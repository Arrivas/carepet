import { createSlice } from "@reduxjs/toolkit";
import { ClientSliceState } from "../pages/_app";
import { Client } from "../pages/_app";

const initialState: ClientSliceState = {
  user: {} as Client,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
