import { Container, Typography } from "@mui/material";
import { getCompanyByNameAction, selectCompany } from "../../features/company/slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

type ParamUrl = {
  name: string;
};

const Company = () => {
  let { name } = useParams<ParamUrl>();
  const { company, error } = useSelector(selectCompany);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (name) {
      dispatch(getCompanyByNameAction(name));
    }
  }, [name, dispatch]);

  return (
    <Container maxWidth="md" sx={{ marginY: 3 }}>
      {error && <span>{error}</span>}
      <Typography variant="h1" component="h2">
        {company?.name}
      </Typography>
    </Container>
  );
};

export default Company;
