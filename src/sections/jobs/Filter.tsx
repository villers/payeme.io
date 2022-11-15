import searchIcon from "@iconify/icons-carbon/search";
import { Autocomplete, Box, Button, Stack, TextField, styled } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query/src/types";
import { SubmitHandler, useForm } from "react-hook-form";

import Iconify from "@/components/Iconify";
import { Company, Job } from "@/interfaces";

type Props = {
  jobs: UseQueryResult<Job[], Error>;
  companies: UseQueryResult<Company[], Error>;
  setFilters: (data: any) => void;
};

const RootStyle = styled("div")(() => ({
  width: "100%",
  "& .MuiAutocomplete-root": {
    "& .MuiInputAdornment-root": {
      marginTop: "0 !important",
    },
    "& .MuiFilledInput-root": {
      height: 56,
      padding: "0 12px",
    },
  },
}));

export type form = {
  company: string;
  job: string;
  city: string;
};

const CareerJobFilters = ({ jobs, companies, setFilters }: Props) => {
  const { register, handleSubmit } = useForm<form>();

  if (jobs.isLoading || companies.isLoading) {
    return <span>Loading...</span>;
  }

  if (jobs.isError || companies.isError) {
    return <span>Error: {jobs.error?.message || companies.error?.message}</span>;
  }

  const submitForm: SubmitHandler<form> = async (data) => {
    setFilters(data);
  };

  return (
    <Box
      sx={{
        pt: 5,
        pb: 8,
        display: {
          xs: "none",
          md: "block",
        },
      }}
      component="form"
      onSubmit={handleSubmit(submitForm)}
    >
      <Stack spacing={2.5} direction={{ xs: "column", md: "row" }} alignItems="center">
        <RootStyle>
          <Autocomplete
            autoHighlight
            openOnFocus
            options={companies.data.map((company) => company.name)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Entreprise" type="text" {...register("company")} />
            )}
          />
        </RootStyle>
        <RootStyle>
          <Autocomplete
            autoHighlight
            openOnFocus
            options={jobs.data.map((jobs) => jobs.name)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Intitulé du poste" type="text" {...register("job")} />
            )}
          />
        </RootStyle>
        <RootStyle>
          <Autocomplete
            autoHighlight
            openOnFocus
            options={["Lyon", "Paris"]}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Localisation" type="text" {...register("city")} />
            )}
          />
        </RootStyle>
        <Button
          size="large"
          variant="contained"
          type="submit"
          sx={{
            px: 0,
            minWidth: { md: 48 },
            display: { xs: "none", md: "inline-flex" },
          }}
        >
          <Iconify icon={searchIcon} sx={{ width: 24, height: 24 }} />
        </Button>
      </Stack>
    </Box>
  );
};

export default CareerJobFilters;
