import { Autocomplete, Box, Button, Container, Slider, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch } from "../app/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createJob, CreateJobQuery, getAllJobAction, selectJob } from "../features/job/slice";
import { useNavigate } from "react-router-dom";
import { getAllCompaniesAction, selectCompany } from "../features/company/slice";

const CreateJob = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const jobSelect = useSelector(selectJob);
  const companySelect = useSelector(selectCompany);
  const { register, handleSubmit } = useForm<CreateJobQuery>();

  useEffect(() => {
    dispatch(getAllCompaniesAction());
    dispatch(getAllJobAction());
  }, [dispatch]);

  const submitForm: SubmitHandler<CreateJobQuery> = (data) => {
    dispatch(createJob(data))
      .unwrap()
      .then(() => navigate("/"));
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
        {jobSelect.error && <span>{jobSelect.error}</span>}
        <div>
          <Autocomplete
            freeSolo
            openOnFocus
            options={companySelect.companies.map((company) => company.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Nom de l'entreprise"
                variant="outlined"
                type="text"
                {...register("company")}
                required
              />
            )}
          />
        </div>

        <div>
          <Autocomplete
            freeSolo
            openOnFocus
            options={jobSelect.jobs.map((job) => job.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Nom du métier"
                variant="outlined"
                type="text"
                {...register("job")}
                required
              />
            )}
          />
        </div>

        <div>
          <TextField fullWidth label="Salaire" variant="outlined" type="number" {...register("salary")} required />
        </div>

        <div>
          <TextField
            fullWidth
            label="Niveau d'étude"
            variant="outlined"
            type="text"
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

        <Button variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }} type="submit" disabled={jobSelect.loading}>
          Ajouter le métier
        </Button>

        <Button variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }} type="reset">
          Réinitialiser
        </Button>
      </Box>
    </Container>
  );
};

export default CreateJob;
