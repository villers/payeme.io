import React from "react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { RootState, useAppDispatch } from "../app/store";
import { registerAction } from "../features/auth/actions";
import { selectAuth } from "../features/auth/slice";
import { Box, Button, Container, TextField } from "@mui/material";

type form = {
  email: string;
  password: string;
};

export const Register = () => {
  const { loading, error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<form>();

  const submitForm: SubmitHandler<form> = (data) => dispatch(registerAction(data));

  return (
    <Container maxWidth="sm" sx={{ marginY: 3 }}>
      <Box component="form" onSubmit={handleSubmit(submitForm)}>
        {error && <span>{error}</span>}
        <div>
          <TextField fullWidth label="Email" variant="outlined" type="email" autoComplete="username" {...register("email")} required />
        </div>
        <div>
          <TextField fullWidth label="Password" variant="outlined" type="password" autoComplete="current-password" {...register("password")} required />
        </div>

        <Button variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }} type="submit" disabled={loading}>
          Inscription
        </Button>

        <Button variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }} type="reset">
          Réinitialiser
        </Button>
      </Box>
    </Container>
  );
};
