import { Box, SxProps } from "@mui/material";
import { theme } from "../../themes/theme";

export default function Container({
  full,
  children,
}: {
  full?: boolean;
  children?: React.ReactNode;
}) {
  const style: SxProps = full
    ? {
        boxSizing: "border-box",
        minWidth: 1280,
        position: "relative",
        width: "100%",
        "@media only screen and (max-device-height: 540px) and (orientation: landscape), only screen and (max-width: 828px)":
          {
            minWidth: `280px !important`,
          },
      }
    : {
        boxSizing: "border-box",
        position: "relative",
        minWidth: 1376,
        "@media only screen and (max-device-height: 540px) and (orientation: landscape), only screen and (max-width: 828px)":
          {
            minWidth: `280px !important`,
          },
      };
  const innerStyle: SxProps = full
    ? {
        boxSizing: "border-box",
        display: "block",
        m: theme.spacing(0, "auto"),
        minHeight: `calc(100vh - 104px)`,
        position: "relative",
        width: 1280,
        p: theme.spacing(11, 6, 15, 6),
        "@media only screen and (min-device-width: 829px) and (max-device-width: 960px) and (-webkit-min-device-pixel-ratio: 1.5)":
          {
            minHeight: `calc(150vh - 104px)`,
          },
        "@media only screen and (max-device-height: 540px) and (orientation: landscape), only screen and (max-width: 828px)":
          {
            p: theme.spacing(9, 3, 12, 3),
            ml: "auto !important",
            minHeight: "0 !important",
            width: "100% !important",
          },
      }
    : {
        boxSizing: "border-box",
        display: "block",
        m: theme.spacing(0, "auto"),
        minHeight: `calc(100vh - 104px)`,
        position: "relative",
        width: 1236,
        p: theme.spacing(11, 6, 12, 25),
        "@media only screen and (max-width: 1493px)": {
          minHeight: `calc(150vh - 104px)`,
          ml: "328px",
          p: theme.spacing(11, 0, 12, 0),
          width: 996,
        },
        "@media only screen and (max-device-height: 540px) and (orientation: landscape), only screen and (max-width: 828px)":
          {
            p: theme.spacing(16, 3, 12, 3),
            ml: "auto !important",
            minHeight: "0 !important",
            width: "100% !important",
          },
      };
  return (
    <Box sx={style}>
      <Box
        sx={innerStyle}
        // className={full ? `container` : `container guide`}
      >
        {children}
      </Box>
    </Box>
  );
}
