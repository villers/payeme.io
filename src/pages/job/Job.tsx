import { Container, Typography } from "@mui/material";
import { getJobByNameAction, selectJob } from "../../features/job/slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

type ParamUrl = {
  name: string;
};

export const Job = () => {
  let { name } = useParams<ParamUrl>();
  const { job, error } = useSelector(selectJob);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (name) {
      dispatch(getJobByNameAction(name));
    }
  }, [name, dispatch]);

  return (
    <Container maxWidth="md" sx={{ marginY: 3 }}>
      {error && <span>{error}</span>}
      <Typography variant="h1" component="h2">
        {job?.name}
      </Typography>
    </Container>
  );
};
