import { Box, Card, CardActions, CardContent, Container, Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { useEffect } from "react";
import { getAllJobAction, selectJob } from "../../features/job/slice";

const Jobs = () => {
  const { jobs } = useSelector(selectJob);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobAction());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ marginY: 3 }}>
      <Typography variant="h1" component="h2">
        Liste des métiers
      </Typography>
      <Box>
        {jobs.map((job, key) => (
          <Card key={key} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {job.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={`/jobs/${job.id}`}>Voir plus</Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Jobs;
