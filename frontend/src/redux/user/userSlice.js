import { createSlice } from '@reduxjs/toolkit';
import User from '../../../../api/models/userModel';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
});

export const { signInStart, signFailure, signSuccess } = userSlice.actions;
export default userSlice.reducer;