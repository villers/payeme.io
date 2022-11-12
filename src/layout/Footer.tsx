import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    Copyright ©
    <Link color="inherit" href="https://toto.com/">
      Payeme.io
    </Link>{" "}
    {new Date().getFullYear()}.
  </Typography>
);

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
