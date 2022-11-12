import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { auth } from "../firebase/config";
import { useAuthSignOut } from "../services/firebase/auth/AuthHook";

const Header = () => {
  const navigate = useNavigate();

  const {
    state: { authUser },
    dispatch,
  } = useStateContext();
  const { mutateAsync } = useAuthSignOut(auth, {
    onSuccess: (data) => {
      console.log("success", data);
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = async () => {
    await mutateAsync();
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link href="/" underline="none">
            PAYEME.IO
          </Link>
        </Typography>

        <nav>
          <Link href="/company" variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
            Entreprises
          </Link>
          <Link href="/job" variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
            Metiers
          </Link>
          <Link href="/create" variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
            Ajouter un Métier
          </Link>
        </nav>

        {authUser ? (
          <Button variant="contained" color="error" sx={{ my: 1, mx: 1.5 }} onClick={handleLogout}>
            logout
          </Button>
        ) : (
          <>
            <Button href="/register" variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }}>
              Inscription
            </Button>
            <Button href="/login" variant="contained" color="success" sx={{ my: 1, mx: 1.5 }}>
              Connexion
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
