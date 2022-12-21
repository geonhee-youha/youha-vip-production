import { Box, ButtonBase, Stack } from "@mui/material";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { pages, PageProps, pageDefaultProps } from "../../contants/pages";
import { theme } from "../../themes/theme";
import newGrey from "../../core/colors/newGrey";
import Typography from "../atoms/Typography";
import Icon from "../atoms/Icon";
import { Dispatch, SetStateAction, useState } from "react";

export default function LocalNav() {
  const router = useRouter();
  const currentPathname = `/${router.pathname.split("/")[1]}`;
  const display =
    currentPathname !== `/` && currentPathname !== `/about` ? "block" : "none";
  const localPage =
    _.findLast(pages, (el) => `${el.href}` === `${currentPathname}`) ??
    pageDefaultProps;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 88,
        left: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        borderRight: `1px solid ${newGrey[200]}`,
        width: 280,
        display: display,
        zIndex: 200,
        "@media(max-width: 828px)": {
          top: 72,
          width: "100%",
          borderRight: "none",
          bottom: "initial",
        },
      }}
    >
      <Stack
        sx={{
          p: theme.spacing(3, 0),
          "@media(max-width: 828px)": {
            p: theme.spacing(0),
          },
        }}
      >
        <LocalNavGroup item={localPage} />
      </Stack>
    </Box>
  );
}

function LocalNavGroup({ item }: { item: PageProps }) {
  const { titles, pages } = item;
  const [groupOpen, setGroupOpen] = useState<boolean>(false);
  const opacity = groupOpen ? 1 : 0;
  const top = groupOpen ? 56 + 72 : "-100%";
  const visibility = groupOpen ? "visible" : "hidden";
  const handleClickGroup = () => {
    setGroupOpen((prev) => !prev);
  };
  return (
    <Stack spacing={1}>
      <ButtonBase
        sx={{
          p: theme.spacing(1, 6),
          cursor: "default important",
          "& *": {
            cursor: "default !important",
          },
          "& .MuiTouchRipple-root": {
            display: "none",
          },
          "@media(max-width: 828px)": {
            cursor: "pointer important",
            "& *": {
              cursor: "pointer !important",
            },
            "& .MuiTouchRipple-root": {
              display: "initial",
            },
            p: theme.spacing(2, 3),
            borderBottom: `1px solid ${newGrey[200]}`,
            backgroundColor: "#ffffff",
            zIndex: 13,
          },
        }}
        onClick={handleClickGroup}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle-2" fontWeight="900">
            {titles["page"]}
          </Typography>
        </Box>
        <Icon
          name="chevron-down"
          sx={{
            display: "none",
            "@media(max-width: 828px)": {
              display: "flex",
            },
          }}
        />
      </ButtonBase>
      <Stack
        sx={{
          "@media(max-width: 828px)": {
            position: "fixed",
            top: top,
            left: 0,
            right: 0,
            bottom: 0,
            visibility: visibility,
            opacity: opacity,
            backgroundColor: "#ffffff",
            transition: `all 0.35s ease`,
            p: theme.spacing(3, 0),
            m: "0 !important",
          },
        }}
      >
        {pages?.map((item, index) => (
          <LocalNavItem key={index} item={item} setGroupOpen={setGroupOpen} />
        ))}
      </Stack>
    </Stack>
  );
}

function LocalNavItem({
  item,
  setGroupOpen,
}: {
  item: PageProps;
  setGroupOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { titles, href, pages } = item;
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const focused = href === router.pathname;
  const color = focused || open ? newGrey[900] : newGrey[400];
  const fontWeight = focused || open ? `700` : `400`;
  const handleClickItem = () => {
    if (pages) return setOpen((prev) => !prev);
    setGroupOpen((prev) => !prev);
  };
  return (
    <>
      {pages ? (
        <ButtonBase
          disableRipple
          disableTouchRipple
          sx={{
            width: "100%",
            p: theme.spacing(1, 6, 1, 6),
            ":hover": {
              backgroundColor: newGrey[100],
            },
            "@media(max-width: 828px)": {
              p: theme.spacing(1, 3, 1, 3),
            },
          }}
          onClick={handleClickItem}
        >
          <Typography variant="body-2" color={color} fontWeight={fontWeight}>
            {titles["nav"]}
          </Typography>
        </ButtonBase>
      ) : (
        <Link href={href} passHref>
          <ButtonBase
            disableRipple
            disableTouchRipple
            sx={{
              width: "100%",
              p: theme.spacing(1, 6, 1, 6),
              ":hover": {
                backgroundColor: newGrey[100],
              },
              "@media(max-width: 828px)": {
                p: theme.spacing(1, 3, 1, 3),
              },
            }}
            onClick={handleClickItem}
          >
            <Typography variant="body-2" color={color} fontWeight={fontWeight}>
              {titles["nav"]}
            </Typography>
          </ButtonBase>
        </Link>
      )}
      {pages && (
        <Box
          sx={{
            width: "100%",
            transition: "all 0.35s ease",
            height: open ? 40 * pages.length : 0,
            overflow: "hidden",
          }}
        >
          {pages.map((item, index) => {
            const { titles, href, pages } = item;
            const router = useRouter();
            const focused = href === router.pathname;
            const color = focused ? newGrey[900] : newGrey[400];
            const fontWeight = focused ? `700` : `400`;
            const handleClickItem = () => {
              if (pages) return setOpen((prev) => !prev);
              setGroupOpen((prev) => !prev);
            };
            return (
              <Link href={href} passHref>
                <ButtonBase
                  disableRipple
                  disableTouchRipple
                  sx={{
                    width: "100%",
                    p: theme.spacing(1, 6, 1, 9),
                    ":hover": {
                      backgroundColor: newGrey[100],
                    },
                    "@media(max-width: 828px)": {
                      p: theme.spacing(1, 3, 1, 6),
                    },
                  }}
                  onClick={handleClickItem}
                >
                  <Typography
                    variant="body-2"
                    color={color}
                    fontWeight={fontWeight}
                  >
                    {titles["nav"]}
                  </Typography>
                </ButtonBase>
              </Link>
            );
          })}
        </Box>
      )}
    </>
  );
}
