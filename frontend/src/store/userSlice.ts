import { createSlice } from "@reduxjs/toolkit";

type userType = {
  user: any;
  error: any;
  loading: boolean;
};

const initialState: userType = {
  user: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state, action) => {
      state.user = action.payload;
    },
    createTeam: (state, action) => {
      state.user.myTeam = action.payload;
    }
  },
});

export default userSlice.reducer;
export const { loginStart, loginSuccess, loginFailed, logOut, createTeam } = userSlice.actions;
