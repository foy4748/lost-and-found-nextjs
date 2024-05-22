import { createSlice } from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  _id: null | string;
  email: null | string;
  username: null | string;
  role: null | string;
  token: null | string;
}

const initialState: IAuthState = {
  _id: null,
  email: null,
  username: null,
  role: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      const { user, token } = action.payload;
      console.log(action.payload);
      const {
        _id,
        email,
        username,
        role,
      }: { _id: string; email: string; username: string; role: string } = user;

      state._id = _id;
      state.email = email;
      state.username = username;
      state.role = role;
      state.token = token;
    },
    logoutUser: (state) => {
      state._id = null;
      state.email = null;
      state.username = null;
      state.role = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticateUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
