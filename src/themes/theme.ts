import { alpha } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  deepOrange,
  amber,
  lightBlue,
  indigo,
  blue,
  red,
  teal,
  orange,
  pink,
  blueGrey,
} from "@mui/material/colors";
import youhaBlue from "./youhaBlue";
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: youhaBlue,
    secondary: {
      main: blueGrey[900],
    },
    grey: blueGrey,
    error: red,
    common: {
      black: blueGrey[900],
    },
    action: {
      active: alpha(blueGrey[900], 0.54),
      hover: alpha(blueGrey[900], 0.04),
      selected: alpha(blueGrey[900], 0.08),
      disabled: alpha(blueGrey[900], 0.26),
      disabledBackground: alpha(blueGrey[900], 0.12),
      focus: alpha(blueGrey[900], 0.12),
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    h1: {
      fontSize: 33,
      lineHeight: "40px",
      fontWeight: "700",
    },
  },
  components: {
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       fontWeight: 500,
    //     },
    //   },
    // },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // color: blueGrey[300],
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 16,
          lineHeight: '24px',
          "& *": { borderWidth: `1px !important` },
          "& fieldset": {
            borderWidth: 1,
            borderColor: youhaBlue[100],
          },
          "&:hover fieldset": {
            borderWidth: 1,
            borderColor: youhaBlue[500],
          },
          "&.Mui-focused fieldset": {
            borderWidth: 1,
            borderColor: youhaBlue[500],
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo"`,
          color: blueGrey[900],
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textAlign: "left",
          // '&:hover': {
          //   backgroundColor: 'transparent',
          // },
          // '&:focus': {
          //   backgroundColor: 'transparent',
          // },
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
          // paddingLeft: "16px !important",
          // paddingRight: "16px !important",
          // paddingLeft: "24px !important",
          // paddingRight: "24px !important",
          "@media(min-width: 1440px)": {
            paddingLeft: "80px",
            paddingRight: "80px",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          maxWidth: 1000,
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          maxWidth: 1000,
          paddingLeft: "16px",
          paddingRight: "16px",
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          maxWidth: 1000,
          paddingLeft: "16px",
          paddingRight: "16px",
          marginLeft: "auto",
          marginRight: "auto",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          maxWidth: 1000,
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          width: "auto",
          height: "auto",
          fontSize: "1.25rem",
          padding: ".25rem",
        },
        fontSizeSmall: {
          fontSize: "1rem",
        },
        fontSizeLarge: {
          fontSize: "1.75rem",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: blueGrey[900],
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 56,
          paddingLeft: "16px",
          paddingRight: "16px",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 56,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: 999999
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: false,
        variant: "contained",
        size: "large",
      },
      styleOverrides: {
        root: {
          minWidth: 0,
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: "-0.4px",
          whiteSpace: "nowrap",
          textTransform: "none",
          fontWeight: "700",
          // borderRadius: 20,
          borderRadius: 8,
          // '&:hover': {
          //   backgroundColor: 'transparent',
          // },
          // '&:focus': {
          //   backgroundColor: 'transparent',
          // },
          minHeight: 40,
          '&.MuiButton-containedPrimary.Mui-disabled': {
            // backgroundColor: youhaBlue[500],
            backgroundColor: blueGrey[100],
            opacity: 0.4,
            cursor: "not-allowed !important",
          },
          '&.MuiButton-containedSecondary.Mui-disabled': {
            backgroundColor: blueGrey[100],
            cursor: "not-allowed !important",
          }
        },
        containedPrimary: {
          // color: '#ffffff',
        },
        sizeSmall: {
          minHeight: 32,
          height: 32,
          // borderRadius: 16,
          fontSize: 12,
          padding: `4px 12px !important`,
        },
        sizeLarge: {
          fontSize: 14,
          minHeight: 44,
          height: 44,
          // borderRadius: 22,
        },
        iconSizeSmall: {
          "& > span": {
            fontSize: "1rem",
            marginBottom: ".1rem",
          },
        },
        iconSizeMedium: {
          "& > span": {
            fontSize: "1.1rem",
            marginBottom: ".1rem",
          },
        },
        iconSizeLarge: {
          "& > span": {
            fontSize: "1.2rem",
            marginBottom: ".1rem",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: blueGrey[700],
        },
        sizeSmall: {
          fontSize: 12,
        },
        sizeMedium: {
          fontSize: 14,
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        root: {
          // width: "2em",
          // height: "2em",
          width: 56,
          height: 56,
          cursor: 'pointer',
          '& *': {
            cursor: 'pointer',
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});
