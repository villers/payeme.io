import { Box, Card, CardActions, CardContent, Container, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Company } from "@/interfaces";
import Routes from "@/routes";
import { CompaniesService } from "@/services/firebase/database";

const ScreenCompanyList = () => {
  const { data, isError, isLoading, error } = useQuery<Company[], Error>(["companies"], CompaniesService.getAll);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container maxWidth="md" sx={{ marginY: 3 }}>
      <Typography variant="h1" component="h2">
        Liste des entreprises
      </Typography>
      <Box>
        {data.map((company: any, key) => (
          <Card key={key} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {company.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={Routes.company.detail(company.id)}>Voir plus</Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ScreenCompanyList;
