import { Stack } from "@mui/material";

type Props = {
  endIcon?: boolean;
  icon?: any;
  sx?: object;
  value: any;
};

const TextIconLabel = ({ icon, value, endIcon = false, sx, ...other }: Props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        typography: "body2",
        ...sx,
      }}
      {...other}
    >
      {!endIcon && icon}
      {value}
      {endIcon && icon}
    </Stack>
  );
};

export default TextIconLabel;
