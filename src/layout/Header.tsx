import menuIcon from "@iconify/icons-carbon/menu";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Iconify from "@/components/Iconify";
import { useStateContext } from "@/context";
import { auth } from "@/firebase/config";
import DesktopNav from "@/layout/DesktopNav";
import MobileNav from "@/layout/MobileNav";
import Routes from "@/routes";
import { useAuthSignOut } from "@/services/firebase/auth/AuthHook";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

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
      navigate(Routes.home);
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
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link href={Routes.home} underline="none">
              PAYEME.IO
            </Link>
          </Typography>

          {isDesktop ? (
            <DesktopNav authUser={authUser} handleLogout={handleLogout} />
          ) : (
            <MobileNav authUser={authUser} handleLogout={handleLogout} />
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
