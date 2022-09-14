import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "../../firebase/config";

export interface LoginPayload {
  email: string;
  uid: string;
}

export interface LoginQuery {
  email: string;
  password: string;
}

export const loginAction = createAsyncThunk<LoginPayload, LoginQuery>("auth/login", ({ email, password }, { rejectWithValue }): any => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userAuth) => ({
      email: userAuth.user?.email,
      uid: userAuth.user?.uid,
    }))
    .catch((err: any) => {
      rejectWithValue(err.message);
    });
});

export interface RegisterPayload {
  email: string;
  uid: string;
}

export interface RegisterQuery {
  email: string;
  password: string;
}

export const registerAction = createAsyncThunk<RegisterPayload, RegisterQuery>("auth/register", ({ email, password }, { rejectWithValue }): any => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userAuth) => ({
      email: userAuth.user?.email,
      uid: userAuth.user?.uid,
    }))
    .catch((err: any) => {
      return rejectWithValue(err.message);
    });
});
