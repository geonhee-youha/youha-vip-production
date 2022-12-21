import { alpha } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  red,
  purple,
} from "@mui/material/colors";
import newBlue from "../core/colors/newBlue";
import newGrey from "../core/colors/newGrey";
import newRed from "../core/colors/newRed";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: newBlue,
    secondary: purple,
    grey: newGrey,
    error: newRed,
    action: {
      active: alpha(newGrey[900], 0.54),
      hover: alpha(newGrey[900], 0.04),
      selected: alpha(newGrey[900], 0.08),
      disabled: alpha(newGrey[900], 0.26),
      disabledBackground: alpha(newGrey[900], 0.12),
      focus: alpha(newGrey[900], 0.12),
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `LINESeedKR, Pretendard, -apple-system, BlinkMacSystemFont, system- ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo","Noto Sans KR", "Malgun Gothic", sans- serif`,
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          textAlign: "left",
          cursor: 'pointer !important',
          '& *': {
            cursor: 'pointer !important',
          },
          transition: `all 0.35s ease`,
          fontFamily: `LINESeedKR, Pretendard, -apple-system, BlinkMacSystemFont, system- ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo","Noto Sans KR", "Malgun Gothic", sans- serif`,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          maxWidth: 1440,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
        size: "large",
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: 28,
          height: 28,
          borderRadius: 8,
          padding: 0,
          cursor: 'pointer',
          '& *': {
            cursor: 'pointer',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          font: 'initial !important',
          fontSize: 16,
          lineHeight: '24px',
          '& input': {
            fontFamily: 'LINESeedKR',
            fontSize: 16,
            lineHeight: '24px !important',
            padding: 0,
            height: 'auto',
          }
        }
      }
    }
  },
});
