import searchIcon from "@iconify/icons-carbon/search";
import { Autocomplete, Box, Button, MenuItem, Select, Stack, TextField, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { ContractData } from "@/components/Contact";
import Iconify from "@/components/Iconify";
import { City, Company, Job } from "@/interfaces";
import { CitiesService, CompaniesService, JobsService } from "@/services/firebase/database";

type Props = {
  setFilters: (data: any) => void;
};

const RootStyle = styled("div")(() => ({
  width: "100%",
}));

export type form = {
  company: string;
  contract: string;
  job: string;
  city: string;
};

const HomeFilters = ({ setFilters }: Props) => {
  const jobs = useQuery<Job[], Error>(["jobs"], () => JobsService.getAll());
  const companies = useQuery<Company[], Error>(["companies"], () => CompaniesService.getAll());
  const cities = useQuery<City[], Error>(["cities"], () => CitiesService.getAll());

  const { register, handleSubmit } = useForm<form>();

  if (jobs.isError || companies.isError || cities.isError) {
    return <span>Error: {jobs.error?.message || companies.error?.message || cities.error?.message}</span>;
  }

  const submitForm: SubmitHandler<form> = async (data) => {
    if (data.contract === "all") {
      data.contract = "";
    }
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
            options={companies.isLoading ? [] : companies.data.map((company) => company.name)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Entreprise" type="text" {...register("company")} />
            )}
          />
        </RootStyle>
        <RootStyle>
          <Autocomplete
            autoHighlight
            openOnFocus
            options={jobs.isLoading ? [] : jobs.data.map((jobs) => jobs.name)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Intitulé du poste" type="text" {...register("job")} />
            )}
          />
        </RootStyle>
        <RootStyle>
          <Autocomplete
            autoHighlight
            openOnFocus
            options={cities.isLoading ? [] : cities.data.map((city) => city.name)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Localisation" type="text" {...register("city")} />
            )}
          />
        </RootStyle>
        <RootStyle>
          <Select label="contract" defaultValue="all" {...register("contract")}>
            <MenuItem key={0} value="all">
              Tous
            </MenuItem>

            {Object.keys(ContractData).map((key: string) => (
              <MenuItem key={key} value={key}>
                {ContractData[key].type}
              </MenuItem>
            ))}
          </Select>
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

export default HomeFilters;
