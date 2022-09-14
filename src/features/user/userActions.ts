import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../firebase/config";

export interface userLoginPayload {
  email: string;
  uid: string;
}

export interface userLoginQuery {
  email: string;
  password: string;
}

export const userLogin = createAsyncThunk<userLoginPayload, userLoginQuery>("user/login", ({ email, password }, { rejectWithValue }): any => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userAuth) => ({
      email: userAuth.user?.email,
      uid: userAuth.user?.uid,
    }))
    .catch((err: any) => {
      rejectWithValue(err.message);
    });
});

export interface userRegisterPayload {
  email: string;
  uid: string;
}

export interface userRegisterQuery {
  email: string;
  password: string;
}

export const userRegister = createAsyncThunk<userRegisterPayload, userRegisterQuery>("user/register", ({ email, password }, { rejectWithValue }): any => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userAuth) => ({
      email: userAuth.user?.email,
      uid: userAuth.user?.uid,
    }))
    .catch((err: any) => {
      return rejectWithValue(err.message);
    });
});
