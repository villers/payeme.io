import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { userLogin, userRegister } from "./userActions";

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

export const userSlice = createSlice({
  name: "user",
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
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = userSlice.actions;

// selectors
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
