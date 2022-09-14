import React from "react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../app/store";
import { loginAction } from "../features/auth/actions";
import { selectAuth } from "../features/auth/slice";

type form = {
  email: string;
  password: string;
};

export const Login = () => {
  const { loading, error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<form>();

  const submitForm: SubmitHandler<form> = (data) => dispatch(loginAction(data));

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <span>{error}</span>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-input" {...register("email")} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-input" {...register("password")} required />
      </div>
      <button type="submit" className="button" disabled={loading}>
        Login
      </button>
    </form>
  );
};
