import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loginAction, logoutAction, refreshAction, registerAction } from "./actions";

interface InitialState {
  loading: boolean;
  user: any;
  error: any;
}

const initialState: InitialState = {
  loading: false,
  user: null,
  error: null,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      });

    builder
      .addCase(refreshAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(refreshAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = slice.actions;

// selectors
export const selectAuth = (state: RootState) => state.auth;

export default slice.reducer;
