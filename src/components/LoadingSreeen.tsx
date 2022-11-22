import { Box, LinearProgress, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SxProps } from "@mui/system";

const RootStyle = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 9999,
  position: "fixed",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

type Props = {
  sx?: SxProps<Theme>;
};

const LoadingScreen = ({ sx }: Props) => (
  <>
    <RootStyle sx={sx}>
      <LinearProgress sx={{ width: 1, maxWidth: 320 }} />
    </RootStyle>

    <Box sx={{ width: "100%", height: "100vh" }} />
  </>
);

export default LoadingScreen;
