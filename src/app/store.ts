import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import auth from "../features/auth/slice";
import company from "../features/company/slice";

export const store = configureStore({
  reducer: {
    auth,
    company,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
