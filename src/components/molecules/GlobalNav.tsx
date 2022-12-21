import { ButtonBase, Stack } from "@mui/material";
import { pages, PageProps } from "../../contants/pages";
import { theme } from "../../themes/theme";
import { useRouter } from "next/router";
import Link from "next/link";
import Typography from "../atoms/Typography";
import newGrey from "../../core/colors/newGrey";
import { Dispatch, SetStateAction } from "react";

export default function GlobalNav({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const currentPathname = `/${router.pathname.split("/")[1]}`;
  const opacity = menuOpen ? 1 : 0;
  const top = menuOpen ? 0 : "5%";
  const visibility = menuOpen ? "visible" : "hidden";
  return (
    <Stack
      direction="row"
      sx={{
        flex: 1,
        transition: `all 0.35s ease`,
        "@media(max-width: 828px)": {
          position: "fixed",
          top: top,
          left: 0,
          right: 0,
          bottom: 0,
          height: "100%",
          opacity: opacity,
          visibility: visibility,
          backgroundColor: "#ffffff",
          p: theme.spacing(8, 3, 3, 2),
          m: `0 !important`,
          flexDirection: "column",
        },
        "&.hoverable:hover *:not(:hover)": {
          color: `${newGrey[400]} !important`,
        },
      }}
      className={
        currentPathname === "/" || currentPathname === "/about"
          ? "hoverable"
          : ""
      }
    >
      {pages.map((item, index) => (
        <GlobalNavItem key={index} item={item} setMenuOpen={setMenuOpen} />
      ))}
    </Stack>
  );
}

function GlobalNavItem({
  item,
  setMenuOpen,
}: {
  item: PageProps;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { titles, href } = item;
  const router = useRouter();
  const currentPathname = `/${router.pathname.split("/")[1]}`;
  const focused = href === currentPathname;
  const color =
    focused || currentPathname === "/" || currentPathname === "/about"
      ? newGrey[900]
      : newGrey[400];
  const handleClickItem = () => {
    setMenuOpen(false);
  };
  return (
    <Link href={href} passHref>
      <ButtonBase
        disableRipple
        disableTouchRipple
        sx={{
          p: theme.spacing(1, 1.5),
          ":hover": {
            ":before": {
              display: "none",
            },
          },
        }}
        onClick={handleClickItem}
      >
        <Typography
          variant="subtitle-2"
          color={color}
          fontWeight="900"
          sx={{
            "&.focusable:hover": {
              color: newGrey[900],
            },
          }}
          className={
            currentPathname === "/" || currentPathname === "/about"
              ? ""
              : "focusable"
          }
        >
          {titles['nav']}
        </Typography>
      </ButtonBase>
    </Link>
  );
}
