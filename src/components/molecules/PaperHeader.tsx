import { Box, IconButton, Stack, Typography } from "@mui/material";
import { blueGrey, pink } from "@mui/material/colors";
import { useEffect } from "react";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";

export default function PaperHeader({
  title,
  queryName,
  onClose,
  children,
  big,
  borderBottom,
}: {
  title: React.ReactNode;
  queryName?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  big?: boolean;
  borderBottom?: boolean;
}) {
  // useEffect(() => {
  //   var paperTargetEl: any = document.querySelector(`.PaperTarget-${queryName}`);
  //   const handleScroll = () => {
  //     var headerEl: any = document.querySelector(`.PaperHeader-${queryName}`);
  //     if (
  //       `${queryName}` === "undefined" ||
  //       paperTargetEl === null ||
  //       headerEl === null
  //     )
  //       return;
  //     if (paperTargetEl.scrollTop > 0) {
  //       headerEl.style.boxShadow = `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`;
  //     } else {
  //       headerEl.style.boxShadow = ``;
  //     }
  //   };
  //   paperTargetEl && paperTargetEl.addEventListener("scroll", handleScroll);
  //   return () => {
  //     paperTargetEl &&
  //       paperTargetEl.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "#ffffff",
        zIndex: 99,
        transition: `all 0.35s ease`,
        borderBottom: `1px solid ${blueGrey[100]}`,
      }}
      className={`PaperHeader-${queryName}`}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={-2}
        sx={{
          p: big
            ? theme.spacing(3, 2, children ? 1 : 2, 2)
            : theme.spacing(1.5, 2, 1.5, 2),
          // position: "realitve",
          // "&:after": {
          //   position: "absolute",
          //   left: 24,
          //   right: 24,
          //   bottom: 0,
          //   height: `1px`,
          //   backgroundColor: blueGrey[100],
          //   content: '""',
          //   display: big || borderBottom ? "block" : "none",
          // },
        }}
      >
        <Box
          sx={{
            mr: "auto",
            p: theme.spacing(0, 1),
          }}
        >
          <Typography
            sx={{
              fontSize: big ? 24 : 20,
              lineHeight: big ? "36px" : "32px",
              fontWeight: "700",
              "& span": {
                color: pink[500],
                ml: 0.5,
              },
            }}
          >
            {title}
          </Typography>
        </Box>
        {!big && (
          <IconButton
            sx={{
              width: 40,
              height: 40,
              " *": {
                cursor: "pointer !important",
              },
            }}
            onClick={onClose}
          >
            <Icon name="xmark" prefix="fas" size={20} color={blueGrey[200]} />
          </IconButton>
        )}
      </Stack>
      {children}
    </Box>
  );
}
