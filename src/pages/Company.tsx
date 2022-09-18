import { Box, Container, Typography } from "@mui/material";
import { getAllCompaniesAction, selectCompany } from "../features/company/slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/store";
import { useEffect } from "react";

export const Company = () => {
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
        <ul>
          {companies.map((company, key) => (
            <li key={key}>{company.name}</li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};
