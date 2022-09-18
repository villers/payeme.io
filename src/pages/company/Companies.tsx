import { Box, Card, CardActions, CardContent, Container, Link, Typography } from "@mui/material";
import { getAllCompaniesAction, selectCompany } from "../../features/company/slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { useEffect } from "react";

export const Companies = () => {
  const { companies } = useSelector(selectCompany);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCompaniesAction());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ marginY: 3 }}>
      <Typography variant="h1" component="h2">
        Liste des entreprises
      </Typography>
      <Box>
        {companies.map((company, key) => (
          <Card key={key} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {company.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={`/companies/${company.name.toLowerCase()}`}>Voir plus</Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
