import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#FAF9F6", // Set the default background color for the whole app
    },
    text: {
      primary: "#32161F", // Set default text color to #32161F
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FAF9F6", // Drawer background color
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#32161F", // Set default color for all Typography components
        },
      },
    },
  },
});

export default theme;
