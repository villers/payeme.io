import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";

import { logoutAction } from "../../features/auth/actions";
import { useAppDispatch } from "../../app/store";
import { selectAuth } from "../../features/auth/slice";
import { useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logoutAction());

  const { user } = useSelector(selectAuth);

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
          <Link href="companies" variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
            Entreprises
          </Link>
          <Link href="jobs" variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
            Metiers
          </Link>
          <Link href="job/create" variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
            Ajouter un Métier
          </Link>
        </nav>

        {user ? (
          <Button variant="contained" color="error" sx={{ my: 1, mx: 1.5 }} onClick={handleLogout}>
            logout
          </Button>
        ) : (
          <>
            <Button href="register" variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }}>
              Inscription
            </Button>
            <Button href="login" variant="contained" color="success" sx={{ my: 1, mx: 1.5 }}>
              Connexion
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
