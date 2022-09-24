import React from "react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../app/store";
import { loginAction } from "../features/auth/actions";
import { selectAuth } from "../features/auth/slice";
import { Box, Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

type form = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<form>();

  const submitForm: SubmitHandler<form> = (data) => {
    dispatch(loginAction(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <Container maxWidth="sm" sx={{ marginY: 3 }}>
      <Box component="form" onSubmit={handleSubmit(submitForm)}>
        {error && <span>{error}</span>}
        <div>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            autoComplete="username"
            {...register("email")}
            required
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            {...register("password")}
            required
          />
        </div>

        <Button variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }} type="submit" disabled={loading}>
          Connexion
        </Button>

        <Button variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }} type="reset">
          Réinitialiser
        </Button>
      </Box>
    </Container>
  );
};
