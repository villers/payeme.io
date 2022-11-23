import GitHubIcon from "@mui/icons-material/GitHub";
import { Button, IconButton, Link } from "@mui/material";

import { IUser } from "@/context";
import Routes from "@/routes";

type Props = {
  handleLogout: () => {};
  authUser: IUser | null;
};

const Desktop = ({ handleLogout, authUser }: Props) => {
  return (
    <>
      <nav>
        <Link href={Routes.create} variant="button" sx={{ mx: 1.5 }}>
          Ajouter un Métier
        </Link>
      </nav>

      <IconButton size="large" href="//github.com/villers/payeme.io" target="_blank" color="inherit">
        <GitHubIcon />
      </IconButton>

      {authUser ? (
        <Button variant="contained" color="warning" sx={{ mx: 1.5 }} onClick={handleLogout}>
          logout
        </Button>
      ) : (
        <>
          <Button href={Routes.auth.register} variant="contained" color="primary" sx={{ mx: 1.5 }}>
            Inscription
          </Button>
          <Button href={Routes.auth.login} variant="contained" color="success" sx={{ mx: 1.5 }}>
            Connexion
          </Button>
        </>
      )}
    </>
  );
};

export default Desktop;
