import { createTheme, MantineThemeOverride } from '@mantine/core';

export const theme:MantineThemeOverride = createTheme({
  /** Put your mantine theme override here */
  breakpoints: {
    xxs: "455px",
    xs: "30em",
    sm: "48em",
    md: "62em",
    lg: "74em",
    lgxl: "1250px",
    xl: "90em",
  },
});