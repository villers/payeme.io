import { useQuery } from "@tanstack/react-query";
import { Record } from "../interfaces";
import { RecordsService } from "../services/firebase/database";
import { Box, Card, CardActions, CardContent, Container, Grid, Link, Typography } from "@mui/material";

const ScreenHome = () => {
  const { data, isError, isLoading, error } = useQuery<Record[], Error>(["record"], RecordsService.getAll);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container maxWidth="md" sx={{ marginY: 3 }}>
      <Typography variant="h1" component="h2">
        Liste des salaires
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {data.map((record, key) => (
            <Grid item xs={4}>
              <Card key={key}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {record.job} / {record.company}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {record.city}
                  </Typography>
                  <Typography variant="body2">
                    {record.note}
                    <br />
                    {record.salary}
                    <br />
                    {record.study_level}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/job/${record.id}`}>Voir plus</Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ScreenHome;
