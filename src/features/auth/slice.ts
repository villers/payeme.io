import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {loginAction, refreshAction, registerAction} from "./actions";

interface InitialState {
  loading: boolean;
  user: any;
  error: any;
  success: boolean;
}

const initialState: InitialState = {
  loading: false,
  user: null, // for user object
  error: null,
  success: false, // for monitoring the registration process.
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log(state, action);
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state, action);
      });

    builder
      .addCase(refreshAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAction.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        state.user = action.payload;
      });
  },
});

export const { login, logout } = slice.actions;

// selectors
export const selectAuth = (state: RootState) => state.auth;

export default slice.reducer;
