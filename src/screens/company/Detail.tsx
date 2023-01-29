import { DocumentReference } from "@firebase/firestore";
import { Container, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingScreen from "@/components/LoadingSreeen";
import Page from "@/components/Page";
import RecordGrid from "@/components/RecordGrid";
import { Company, Record } from "@/interfaces";
import ScreenNotfound from "@/screens/NotFound";
import CompanyDetail from "@/sections/company/Detail";
import { calculateAvgSalary, calculateAvgTJM } from "@/services/filter";
import { CompaniesService, RecordsService } from "@/services/firebase/database";

type ParamUrl = {
  name: string;
};
const ScreenCompanyDetail = () => {
  let { name } = useParams<ParamUrl>();

  const company = useQuery<Company, Error>(["companies", name], () => CompaniesService.getOne(name));
  const companyRef = useQuery<DocumentReference, Error>(
    ["ref", "companies", name],
    () => CompaniesService.getDocumentRef(name),
    {
      enabled: company.isSuccess,
    }
  );
  const records = useQuery<Record[], Error>(
    ["records", "companies", name],
    () => RecordsService.getAll({ companyRef: companyRef.data }),
    {
      enabled: companyRef.isSuccess,
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

  if (company.isError || companyRef.isError || records.isError) {
    return <ScreenNotfound />;
  }

  if (company.isLoading || companyRef.isLoading || records.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={`Entreprise - ${name}`}>
      <Container sx={{ marginY: 3 }}>
        <Stack spacing={5}>
          <CompanyDetail company={company.data} avgSalary={avgSalary} avgTJM={avgTJM} />
          <RecordGrid data={records.data} />
        </Stack>
      </Container>
    </Page>
  );
};

export default ScreenCompanyDetail;
