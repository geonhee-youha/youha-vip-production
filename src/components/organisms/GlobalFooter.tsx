import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import newGrey from "../../core/colors/newGrey";
import { theme } from "../../themes/theme";
import Typography from "../atoms/Typography";

export default function GlobalFooter() {
  const router = useRouter();
  const currentPathname = `/${router.pathname.split("/")[1]}`;
  const full = currentPathname === "/" || currentPathname === "/about";
  return (
    <Box
      sx={{
        position: "relative",
        minWidth: 1280,
        zIndex: 100,
        "@media only screen and (max-device-height: 540px) and (orientation: landscape), only screen and (max-width: 828px)":
          {
            p: theme.spacing(0, 3),
            minWidth: "280px !important",
          },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={
          full
            ? {
                height: 104,
                m: theme.spacing(0, "auto"),
                maxWidth: 1200,
              }
            : {
                borderTop: `1px solid ${newGrey[200]}`,
                height: 104,
                m: theme.spacing(0, "auto"),
                maxWidth: 996,
                "@media only screen and (max-width: 1493px)": {
                  ml: "328px",
                },
                "@media only screen and (max-device-height: 540px) and (orientation: landscape), only screen and (max-width: 828px)":
                  {
                    height: "auto",
                    flexDirection: "column-reverse",
                    alignItems: "flex-start",
                    m: "0 !imporant",
                    ml: "0 !important",
                    p: theme.spacing(0, 0, 6, 0),
                    "& > *": {
                      p: theme.spacing(4, 0, 0, 0,),
                    },
                  },
              }
        }
      >
        <Typography variant="body-4">© Ticketplace</Typography>
        <Stack
          direction="row"
          spacing={3}
          sx={{
            ":hover > *:not(:hover)": {
              color: newGrey[400],
            },
          }}
        >
          <Link href="/about/temrs" passHref>
            <Typography
              variant="body-4"
              sx={{
                cursor: "pointer",
              }}
            >
              Terms of Use
            </Typography>
          </Link>
          <Link href="/about/faq" passHref>
            <Typography variant="body-4">FAQ</Typography>
          </Link>
          <Typography variant="body-4">Contact Us</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
