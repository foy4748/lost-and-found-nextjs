import { createSlice } from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  id: null | string;
  email: null | string;
  name: null | string;
  token: null | string;
  isAdmin: false | undefined | null | boolean;
  photoUrl?: string;
}

const initialState: IAuthState = {
  id: null,
  email: null,
  name: null,
  isAdmin: false,
  token: null,
  photoUrl: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      const { user, token, photoUrl } = action.payload;
      console.log(action.payload);
      const {
        id,
        email,
        name,
        isAdmin,
      }: {
        id: string;
        email: string;
        name: string;
        isAdmin: false | undefined | boolean;
      } = user;

      state.id = id;
      state.email = email;
      state.name = name;
      state.isAdmin = Boolean(isAdmin);
      state.token = token;
      state.photoUrl = photoUrl;
      return state;
    },
    logoutUser: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.isAdmin = null;
      state.token = null;
      state.photoUrl = undefined;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticateUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
