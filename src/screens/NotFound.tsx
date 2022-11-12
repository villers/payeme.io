import { Box, Button, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link href="/">
        <Button variant="contained">Back Home</Button>
      </Link>
    </Box>
  );
};

export default ScreenNotfound;
