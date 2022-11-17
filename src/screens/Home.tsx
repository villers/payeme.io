import { Container, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Page from "@/components/Page";
import { Record } from "@/interfaces";
import CareerJobFilters, { form } from "@/sections/jobs/Filter";
import CareerJobList from "@/sections/jobs/List";
import { RecordsService } from "@/services/firebase/database";

const HEADER_MOBILE_HEIGHT = 64;
const HEADER_DESKTOP_HEIGHT = 96;

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up("md")]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

const ScreenHome = () => {
  const [filters, setFilters] = useState<form>({
    job: "",
    city: "",
    company: "",
  });

  const { data, isError, isLoading, error, refetch } = useQuery<Record[], Error>(["record"], () =>
    RecordsService.getAll(filters)
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  useEffect(() => {
    refetch();
  }, [filters]);

  const jobs = data || [];

  return (
    <Page title="Jobs - Career">
      <RootStyle>
        <Container>
          <CareerJobFilters setFilters={setFilters} />
          <CareerJobList jobs={jobs} loading={isLoading} />
        </Container>
      </RootStyle>
    </Page>
  );
};

export default ScreenHome;
