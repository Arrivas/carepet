import { createSlice } from "@reduxjs/toolkit";

interface LoadingSliceInitialState {
  loading: boolean;
}

const initialState: LoadingSliceInitialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
