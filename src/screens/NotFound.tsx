import { Box, Button, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Routes from "@/routes";

const ScreenNotfound = () => {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "80vh",
        backgroundColor: main,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        La page n'existe pas.
      </Typography>
      <Link href={Routes.home}>
        <Button variant="contained">Retourner sur la page d'accueil</Button>
      </Link>
    </Box>
  );
};

export default ScreenNotfound;
