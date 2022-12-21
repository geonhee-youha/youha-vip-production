import { alpha, Backdrop, Box, InputBase, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import newBlue from "../../core/colors/newBlue";
import newGrey from "../../core/colors/newGrey";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";
import IconButton from "../atoms/IconButton";
import Typography from "../atoms/Typography";
import GlobalNav from "../molecules/GlobalNav";

export default function GlobalHeader() {
  const router = useRouter();
  const pathname = router.pathname;
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuIcon = menuOpen || searchOpen ? "xmark-large" : "bars-sort";
  const handleClickHome = () => {
    setMenuOpen(false);
  };
  const handleClickSearch = () => {
    if (menuOpen) return;
    setSearchOpen((prev) => !prev);
  };
  const handleClickMenu = () => {
    if (searchOpen) return setSearchOpen((prev) => !prev);
    setMenuOpen((prev) => !prev);
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor:
            pathname !== "/" ? "#ffffff" : alpha("#ffffff", 0.95),
          zIndex: 200,
          borderBottom: pathname !== "/" ? `1px solid ${newGrey[200]}` : "none",
          p: theme.spacing(3, 12, 3, 6),
          transition: `all 0.35s ease`,
          "@media(max-width: 828px)": {
            width: "100%",
            p: theme.spacing(2, 6, 2, 3),
            borderBottom: `1px solid ${newGrey[200]}`,
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3}>
          <GlobalLogo setMenuOpen={setMenuOpen} />
          <GlobalNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </Stack>
        <GlobalSearchBar
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            p: theme.spacing(3, 5),
            zIndex: 12,
            "@media(max-width: 828px)": {
              p: theme.spacing(2, 2),
              "& > *:not(:nth-child(1))": {
                ml: 0,
              },
            },
          }}
        >
          <Box
            sx={{
              height: 24,
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              border: `1px solid ${newGrey[200]}`,
              p: theme.spacing(0, 1.5),
              "@media(max-width: 828px)": {
                display: "none",
              },
            }}
          >
            <Typography variant="caption-2" fontWeight="700">
              v 1.0.0
            </Typography>
          </Box>
          {searchOpen ? null : menuOpen ? (
            <Link href="/" passHref>
              <IconButton
                onClick={handleClickHome}
                sx={{
                  width: 40,
                  height: 40,
                }}
              >
                <Icon prefix="fas" name="home-alt" />
              </IconButton>
            </Link>
          ) : (
            <IconButton
              onClick={handleClickSearch}
              sx={{
                width: 40,
                height: 40,
              }}
            >
              <Icon name="search" />
            </IconButton>
          )}
          <IconButton
            onClick={handleClickMenu}
            sx={{
              width: 40,
              height: 40,
              display: searchOpen ? "flex" : "none",
              "@media(max-width: 828px)": {
                display: "flex",
              },
            }}
          >
            <Icon name={menuIcon} />
          </IconButton>
        </Stack>
      </Box>
      <Backdrop open={searchOpen} onClick={handleClickSearch} />
    </>
  );
}

function GlobalLogo({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClickLogo = () => {
    setMenuOpen(false);
  };
  return (
    <Link href="/" passHref>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 40,
          cursor: "pointer",
          "@media(max-width: 828px)": {
            width: "100%",
          },
        }}
        onClick={handleClickLogo}
      >
        <Typography
          variant="subtitle-1"
          fontWeight="900"
          sx={{
            ":hover": {
              color: newGrey[900],
            },
          }}
        >
          Y<span className="web">OUHA</span>
          <span className="blue">.</span>Design System
        </Typography>
      </Box>
    </Link>
  );
}

function GlobalSearchBar({
  searchOpen,
  setSearchOpen,
}: {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const opacity = searchOpen ? 1 : 0;
  const right = searchOpen ? 0 : "20%";
  const visibility = searchOpen ? "visible" : "hidden";
  const handleClickSearch = () => {
    setSearchOpen(false);
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 256,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "flex-end",
        transition: `all 0.35s ease`,
        visibility: visibility,
        opacity: opacity,
        zIndex: 11,
        "@media(max-width: 828px)": {
          left: 0,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          transition: `all 0.35s ease`,
          transform: `translateX(${right})`,
          width: 480,
          "@media(max-width: 828px)": {
            width: "100%",
            p: theme.spacing(2, 10, 2, 2),
            "& > *:not(:nth-child(1))": {
              m: theme.spacing(0, 0, 0, 1),
            },
          },
        }}
      >
        <IconButton onClick={handleClickSearch}>
          <Icon name="search" />
        </IconButton>
        <InputBase
          placeholder="Search YDS"
          sx={{
            flex: 1,
            "& input": {
              fontSize: 16,
              lineHeight: "24px !important",
              padding: 0,
              height: "auto",
              "::placeholder": {
                color: `${newGrey[600]} !important`,
                opacity: 1,
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
}
