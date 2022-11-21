import { Autocomplete, Box, Button, MenuItem, Slider, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LoadingScreen from "@/components/LoadingSreeen";
import { functions } from "@/firebase/config";
import { City, Company, Job } from "@/interfaces";
import Routes from "@/routes";
import { CitiesService, CompaniesService, JobsService } from "@/services/firebase/database";
import { useFunctionsCall } from "@/services/firebase/functions/FunctionsHook";

type addJobQuery = {
  company: string;
  job: string;
  salary: number;
  study_level: string;
  city: string;
  note: number;
  experience: number;
};

export const StudyLevel: any = {
  "-1": "Pas de diplôme",
  "0": "CAP, BEP",
  "1": "Baccalauréat ",
  "2": "DEUG, BTS, DUT, DEUST",
  "3": "Licence, Licence LMD, licence professionnelle",
  "4": "Maîtrise",
  "5": "Master, DEA, DESS, diplôme d'ingénieur",
  "8": "Doctorat, habilitation à diriger des recherches",
};

const RecordForm = () => {
  const navigate = useNavigate();

  const jobs = useQuery<Job[], Error>(["jobs"], () => JobsService.getAll());
  const companies = useQuery<Company[], Error>(["companies"], () => CompaniesService.getAll());
  const cities = useQuery<City[], Error>(["cities"], () => CitiesService.getAll());

  const { mutate, isLoading } = useFunctionsCall(
    functions,
    "addJob",
    {},
    {
      onSuccess: () => {
        navigate(Routes.home);
      },
    }
  );

  const { register, handleSubmit } = useForm<addJobQuery>();
  const submitForm: SubmitHandler<addJobQuery> = (data) => mutate(data);

  if (jobs.isLoading || companies.isLoading || cities.isLoading) {
    return <LoadingScreen />;
  }

  if (jobs.isError || companies.isError || cities.isError) {
    return <span>Error: {jobs.error?.message || companies.error?.message || cities.error?.message}</span>;
  }

  return (
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
              label="Entreprise"
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
              label="Intitulé du poste"
              variant="outlined"
              type="text"
              {...register("job")}
              required
            />
          )}
        />
      </div>

      <div>
        <Autocomplete
          freeSolo
          openOnFocus
          options={cities.data.map((city) => city.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Localisation"
              variant="outlined"
              type="text"
              {...register("city")}
              required
            />
          )}
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Rémunération annuel brut en €"
          variant="outlined"
          type="number"
          {...register("salary")}
          required
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Expérience en années"
          variant="outlined"
          type="number"
          {...register("experience")}
          required
        />
      </div>

      <div>
        <TextField
          fullWidth
          label="Niveau d'étude"
          variant="outlined"
          select
          defaultValue="-1"
          {...register("study_level")}
          required
        >
          {Object.keys(StudyLevel).map((index) => (
            <MenuItem value={index} key={index}>
              {StudyLevel[index]}
            </MenuItem>
          ))}
        </TextField>
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
  );
};

export default RecordForm;
