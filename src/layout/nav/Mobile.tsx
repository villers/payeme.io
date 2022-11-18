import menuIcon from "@iconify/icons-carbon/menu";
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
      <IconButton
        size="medium"
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
        }}
      >
        <Iconify icon={menuIcon} sx={{}} />
      </IconButton>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: DRAWER_WIDTH },
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <List sx={{ px: 0 }}>
            <ListItemButton>
              <Link href={Routes.home} variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
                Accueil
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link href={Routes.company.list} variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
                Entreprises
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link href={Routes.job.list} variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
                Metiers
              </Link>
            </ListItemButton>
            <ListItemButton>
              <Link href={Routes.create} variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
                Ajouter un Métier
              </Link>
            </ListItemButton>
          </List>

          <Stack spacing={2} sx={{ p: 2.5, pb: 5 }}>
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
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Mobile;
