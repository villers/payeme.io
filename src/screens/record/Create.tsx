import { Autocomplete, Box, Button, Container, Slider, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { functions } from "@/firebase/config";
import { Company, Job } from "@/interfaces";
import { CompaniesService, JobsService } from "@/services/firebase/database";
import { useFunctionsCall } from "@/services/firebase/functions/FunctionsHook";

type addJobQuery = {
  company: string;
  job: string;
  salary: number;
  study_level: string;
  city: string;
  note: number;
};

const ScreenRecordCreate = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<addJobQuery>();

  const jobs = useQuery<Job[], Error>(["jobs"], JobsService.getAll);
  const companies = useQuery<Company[], Error>(["companies"], CompaniesService.getAll);

  const { mutate, isLoading } = useFunctionsCall(
    functions,
    "addJob",
    {},
    {
      onSuccess: () => {
        navigate("/");
      },
    }
  );

  const submitForm: SubmitHandler<addJobQuery> = (data) => mutate(data);

  if (jobs.isLoading || companies.isLoading) {
    return <span>Loading...</span>;
  }

  if (jobs.isError || companies.isError) {
    return <span>Error: {jobs.error?.message || companies.error?.message}</span>;
  }

  return (
    <Container maxWidth="sm" sx={{ marginY: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      >
        <div>
          <Autocomplete
            freeSolo
            openOnFocus
            options={companies.data.map((company) => company.name)}
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
            options={jobs.data.map((job) => job.name)}
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

        <Button variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }} type="submit" disabled={isLoading}>
          Ajouter le métier
        </Button>

        <Button variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }} type="reset">
          Réinitialiser
        </Button>
      </Box>
    </Container>
  );
};

export default ScreenRecordCreate;
