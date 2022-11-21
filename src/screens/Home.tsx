import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Page from "@/components/Page";
import { Record } from "@/interfaces";
import HomeFilters, { form } from "@/sections/home/Filter";
import HomeList from "@/sections/home/List";
import { RecordsService } from "@/services/firebase/database";

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
      <Container>
        <HomeFilters setFilters={setFilters} />
        <HomeList jobs={jobs} loading={isLoading} />
      </Container>
    </Page>
  );
};

export default ScreenHome;
