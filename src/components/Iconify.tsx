import { Icon } from "@iconify/react";
import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

type Props = {
  icon: string | any;
  sx?: SxProps<Theme>;
};

const Iconify = ({ icon, sx, ...other }: Props) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

export default Iconify;
