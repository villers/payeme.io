import { Button, Link } from "@mui/material";

import { IUser } from "@/context";
import Routes from "@/routes";

type Props = {
  handleLogout: () => {};
  authUser: IUser | null;
};

const DesktopNav = ({ handleLogout, authUser }: Props) => {
  return (
    <>
      <nav>
        <Link href={Routes.company.list} variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
          Entreprises
        </Link>
        <Link href={Routes.job.list} variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
          Metiers
        </Link>
        <Link href={Routes.create} variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
          Ajouter un Métier
        </Link>
      </nav>

      {authUser ? (
        <Button variant="contained" color="error" sx={{ my: 1, mx: 1.5 }} onClick={handleLogout}>
          logout
        </Button>
      ) : (
        <>
          <Button href={Routes.auth.register} variant="contained" color="primary" sx={{ my: 1, mx: 1.5 }}>
            Inscription
          </Button>
          <Button href={Routes.auth.login} variant="contained" color="success" sx={{ my: 1, mx: 1.5 }}>
            Connexion
          </Button>
        </>
      )}
    </>
  );
};

export default DesktopNav;
