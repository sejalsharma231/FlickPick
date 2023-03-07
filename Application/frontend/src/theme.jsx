import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A1F25",
    },
    secondary: {
      main: "#F0A202",
    },
    error: {
      main: "#FF5733",
    },
    text: {
    primary:"#333333"
    },
    background: {
      default: "#EFEFEF",
      paper: "#FFFFFF",
    },
  },
});

export default theme;