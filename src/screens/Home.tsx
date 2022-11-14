import { Box, Container, Grid, Link, Paper, Typography, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import Page from "@/components/Page";
import { Record } from "@/interfaces";
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
  const { data, isError, isLoading, error } = useQuery<Record[], Error>(["record"], RecordsService.getAll);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const jobs = data || [];

  return (
    <Page title="Jobs - Career">
      <RootStyle>
        <Container>
          <CareerJobList jobs={jobs} loading={isLoading} />
        </Container>
      </RootStyle>
    </Page>
  );
};

export default ScreenHome;
