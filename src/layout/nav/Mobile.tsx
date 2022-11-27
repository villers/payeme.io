import menuIcon from "@iconify/icons-carbon/menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, Drawer, IconButton, Link, List, ListItemButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Iconify from "@/components/Iconify";
import { IUser } from "@/context";
import Routes from "@/routes";

export const DRAWER_WIDTH = 280;

type Props = {
  handleLogout: () => {};
  authUser: IUser | null;
};

const Mobile = ({ handleLogout, authUser }: Props) => {
  let { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
  }, [pathname]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButton size="large" href="//github.com/villers/payeme.io" target="_blank" color="inherit">
        <GitHubIcon />
      </IconButton>
      <IconButton size="medium" onClick={handleDrawerOpen}>
        <Iconify icon={menuIcon} />
      </IconButton>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: DRAWER_WIDTH },
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <List>
            <ListItemButton>
              <Link href={Routes.home} variant="button" sx={{ my: 1, mx: 1.5 }}>
                Accueil
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link href={Routes.create} variant="button" sx={{ my: 1, mx: 1.5 }}>
                Partager mon salaire
              </Link>
            </ListItemButton>
          </List>

          <Stack>
            {authUser ? (
              <Button variant="contained" color="warning" sx={{ my: 1, mx: 1.5 }} onClick={handleLogout}>
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
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Mobile;
