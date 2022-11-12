import { Box, Card, CardActions, CardContent, Container, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Job } from "@/interfaces";
import { JobsService } from "@/services/firebase/database";

const ScreenJobList = () => {
  const { data, isError, isLoading, error } = useQuery<Job[], Error>(["jobs"], JobsService.getAll);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container maxWidth="md" sx={{ marginY: 3 }}>
      <Typography variant="h1" component="h2">
        Liste des métiers
      </Typography>
      <Box>
        {data.map((job, key) => (
          <Card key={key} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {job.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={`/job/${job.id}`}>Voir plus</Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ScreenJobList;
