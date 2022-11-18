import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import { ReactElement } from "react";

import components from "@/theme/components";
import palette from "@/theme/palette";

type Props = {
  children: ReactElement;
};

export default function ThemeProvider({ children }: Props) {
  const themeOptions: any = {
    palette,
    components,
  };
  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
