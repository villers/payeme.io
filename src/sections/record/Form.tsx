import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Box, Button, MenuItem, Slider, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import LoadingScreen from "@/components/LoadingSreeen";
import { StudyLevelData } from "@/components/StudyLevel";
import { useStateContext } from "@/context";
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

const RecordForm = () => {
  const {
    state: { authUser },
  } = useStateContext();

  const navigate = useNavigate();

  const captchaAction = "addJob";
  const { executeRecaptcha } = useGoogleReCaptcha();

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

  const schema = yup
    .object()
    .shape({
      company: yup.string().required(),
      job: yup.string().required(),
      salary: yup.number().min(1000).required(),
      study_level: yup.string().required(),
      city: yup.string().required(),
      note: yup.number().min(0).max(5).required(),
      experience: yup.number().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addJobQuery>({
    resolver: yupResolver(schema),
  });
  const submitForm: SubmitHandler<addJobQuery> = useCallback(
    async (data) => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return false;
      }
      const token = await executeRecaptcha(captchaAction);

      console.log(token);
      if (token === "") {
        console.log("Token is invalide");
        return false;
      }
      mutate({ ...data, userId: authUser?.uid, userEmail: authUser?.email });
    },
    [executeRecaptcha]
  );

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
              error={errors.company?.message != undefined}
              helperText={<ErrorMessage errors={errors} name="company" />}
              {...register("company")}
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
              error={errors.job?.message != undefined}
              helperText={<ErrorMessage errors={errors} name="job" />}
              {...register("job")}
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
              error={errors.city?.message != undefined}
              helperText={<ErrorMessage errors={errors} name="city" />}
              {...register("city")}
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
          error={errors.salary?.message != undefined}
          helperText={<ErrorMessage errors={errors} name="salary" />}
          {...register("salary")}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="Expérience en années"
          variant="outlined"
          type="number"
          error={errors.experience?.message != undefined}
          helperText={<ErrorMessage errors={errors} name="experience" />}
          {...register("experience")}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="Niveau d'étude"
          variant="outlined"
          select
          defaultValue="-1"
          error={errors.study_level?.message != undefined}
          helperText={<ErrorMessage errors={errors} name="study_level" />}
          {...register("study_level")}
        >
          {Object.keys(StudyLevelData).map((index) => (
            <MenuItem value={index} key={index}>
              {StudyLevelData[index]}
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
        Partager mon salaire
      </Button>
      <Button variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }} type="reset">
        Réinitialiser
      </Button>
    </Box>
  );
};

export default RecordForm;
