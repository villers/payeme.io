import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useStateContext } from "../../context";
import { useAuthSignInWithEmailAndPassword } from "../../services/firebase/auth/AuthHook";

type form = {
  email: string;
  password: string;
};

const ScreenLogin = () => {
  const navigate = useNavigate();
  const { dispatch } = useStateContext();

  const { mutate, isError, error, isLoading } = useAuthSignInWithEmailAndPassword(auth, {
    onSuccess: (data) => {
      console.log("success", data);
      dispatch({
        type: "SET_USER",
        payload: {
          email: data.user.email,
          uid: data.user.uid,
        },
      });
      navigate("/");
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
          Connexion
        </Button>

        <Button variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }} type="reset">
          Réinitialiser
        </Button>
      </Box>
    </Container>
  );
};

export default ScreenLogin;
