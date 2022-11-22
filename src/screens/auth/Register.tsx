import { Box, Button, Container, TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Page from "@/components/Page";
import { useStateContext } from "@/context";
import { auth } from "@/firebase/config";
import Routes from "@/routes";
import { useAuthCreateUserWithEmailAndPassword } from "@/services/firebase/auth/AuthHook";

type form = {
  email: string;
  password: string;
};

const ScreenRegister = () => {
  const navigate = useNavigate();
  const { dispatch } = useStateContext();

  const { mutate, isError, error, isLoading } = useAuthCreateUserWithEmailAndPassword(auth, {
    onSuccess: (data) => {
      dispatch({
        type: "SET_USER",
        payload: {
          email: data.user.email,
          uid: data.user.uid,
        },
      });
      navigate(Routes.home);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { register, handleSubmit } = useForm<form>();

  const submitForm: SubmitHandler<form> = (data) => {
    mutate(data);
  };

  return (
    <Page title="Inscription">
      <Container maxWidth="sm" sx={{ marginY: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
        >
          {isError && <span>{error.message}</span>}
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

          <Button variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }} type="submit" disabled={isLoading}>
            Inscription
          </Button>

          <Button variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }} type="reset">
            Réinitialiser
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

export default ScreenRegister;
