import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Job as J } from "../../interfaces";
import { JobsService } from "../../services/firebase/database";

type ParamUrl = {
  name: string;
};

const ScreenJobDetail = () => {
  let { name } = useParams<ParamUrl>();
  const { data, isError, isLoading, error } = useQuery<J, Error>(["job", name], JobsService.getOne);

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

export default ScreenJobDetail;
