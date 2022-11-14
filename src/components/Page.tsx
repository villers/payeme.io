import { Box } from "@mui/material";
import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";

type Props = {
  children: React.ReactNode;
  meta?: React.ReactNode;
  title: string;
};

const Page = forwardRef(({ children, meta, title, ...other }: Props, ref) => (
  <>
    <Helmet>
      <title>{`${title} | Payeme`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
