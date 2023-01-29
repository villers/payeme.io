import { DocumentReference } from "@firebase/firestore";
import { Container, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingScreen from "@/components/LoadingSreeen";
import Page from "@/components/Page";
import RecordGrid from "@/components/RecordGrid";
import { Job, Record } from "@/interfaces";
import ScreenNotfound from "@/screens/NotFound";
import JobDetail from "@/sections/job/Detail";
import { calculateAvgSalary, calculateAvgTJM } from "@/services/filter";
import { JobsService, RecordsService } from "@/services/firebase/database";

type ParamUrl = {
  name: string;
};

const ScreenJobDetail = () => {
  let { name } = useParams<ParamUrl>();

  const job = useQuery<Job, Error>(["jobs", name], () => JobsService.getOne(name));
  const jobRef = useQuery<DocumentReference, Error>(["refs", "job", name], () => JobsService.getDocumentRef(name), {
    enabled: job.isSuccess,
  });
  const records = useQuery<Record[], Error>(
    ["records", "jobs", name],
    () => RecordsService.getAll({ jobRef: jobRef.data }),
    {
      enabled: jobRef.isSuccess,
    }
  );

  const [avgSalary, setAvgSalary] = useState(0);
  useEffect(() => {
    setAvgSalary(calculateAvgSalary(records.data || []));
  }, [records]);

  const [avgTJM, setAvgTJM] = useState(0);
  useEffect(() => {
    setAvgTJM(calculateAvgTJM(records.data || []));
  }, [records]);

  if (job.isError || jobRef.isError || records.isError) {
    return <ScreenNotfound />;
  }

  if (job.isLoading || jobRef.isLoading || records.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={`Metier - ${name}`}>
      <Container sx={{ marginY: 3 }}>
        <Stack spacing={5}>
          <JobDetail job={job.data} avgSalary={avgSalary} avgTJM={avgTJM} />
          <RecordGrid data={records.data} />
        </Stack>
      </Container>
    </Page>
  );
};

export default ScreenJobDetail;
