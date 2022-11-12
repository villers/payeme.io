import { Container, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CompaniesService } from "../../services/firebase/database";
import { Company as C } from "../../interfaces";

type ParamUrl = {
  name: string;
};

const ScreenCompanyDetail = () => {
  let { name } = useParams<ParamUrl>();
  const { data, isError, isLoading, error } = useQuery<C, Error>(["companies", name], CompaniesService.getOne);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container maxWidth="md" sx={{ marginY: 3 }}>
      <Typography variant="h1" component="h2">
        {data.name}
      </Typography>
    </Container>
  );
};

export default ScreenCompanyDetail;
