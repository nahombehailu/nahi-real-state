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
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
    },
  },
});

export const { signInStart, 
  signFailure,
   signSuccess,updateUserFailure,updateUserStart,updateUserSuccess,
   deleteUserSuccess,deleteUserFailure,deleteUserStart,
   signOutUserFailure,signOutUserStart,signOutUserSuccess
   } = userSlice.actions;
export default userSlice.reducer;