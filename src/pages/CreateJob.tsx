import { Box, Button, Container, Slider, TextField, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/slice";

type form = {
  company: string;
  job: string;
  salary: number;
  study_level: string;
  city: string;
  note: number;
};

export const CreateJob = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector(selectAuth);
  const { register, handleSubmit } = useForm<form>();

  const submitForm: SubmitHandler<form> = (data) => {
    console.log(data);
    // dispatch(loginAction(data))
    //   .unwrap()
    //   .then(() => navigate("/"));
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
        {error && <span>{error}</span>}
        <div>
          <TextField
            fullWidth
            label="Nom de l'entreprise"
            variant="outlined"
            type="text"
            autoComplete="Paypal"
            {...register("company")}
            required
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Nom du métier"
            variant="outlined"
            type="text"
            autoComplete="Devops"
            {...register("job")}
            required
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Salaire"
            variant="outlined"
            type="number"
            autoComplete="42000"
            {...register("salary")}
            required
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Niveau d'étude"
            variant="outlined"
            type="text"
            autoComplete="bac +3"
            {...register("study_level")}
            required
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Ville"
            variant="outlined"
            type="text"
            autoComplete="Lyon"
            {...register("city")}
            required
          />
        </div>

        <div>
          <Typography id="note-slider" gutterBottom>
            Note de l'entreprise
          </Typography>
          {/*// @ts-ignore÷ todo: check this*/}
          <Slider
            aria-label="Note sur 5"
            aria-labelledby="note-slider"
            valueLabelDisplay="auto"
            marks
            step={1}
            min={1}
            max={5}
            defaultValue={5}
            {...register("note")}
          />
        </div>

        <Button variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }} type="submit" disabled={loading}>
          Ajouter le métier
        </Button>

        <Button variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }} type="reset">
          Réinitialiser
        </Button>
      </Box>
    </Container>
  );
};
