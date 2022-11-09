import { alpha, Box, ButtonBase } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NoticeProps } from "../../datas";
import { theme } from "../../themes/theme";
import { displayedAt } from "../../utils";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";

export default function NoticeItem({
  item,
  inMainTab,
}: {
  item: NoticeProps;
  inMainTab?: boolean;
}) {
  const router = useRouter();
  const { id: queryId } = router.query;
  const [open, setOpen] = useState<boolean>(false);
  const [bodyHeight, setBodyHeight] = useState<number>(0);
  const { id, title, body, createdAt } = item;
  useEffect(() => {
    if (!inMainTab) {
      if (`${queryId}` === `${id}`) {
        const bodyEl: HTMLElement | null = document.querySelector(
          `.NoticeItem-${id}-body`
        );
        setOpen(true);
        setBodyHeight(bodyEl ? bodyEl.offsetHeight : 0);
      } else {
        setOpen(false);
      }
    }
  }, [queryId]);
  const handleClick = () => {
    if (inMainTab) {
      router.push(`/notice?id=${id}`);
    } else {
      const bodyEl: HTMLElement | null = document.querySelector(
        `.NoticeItem-${id}-body`
      );
      setOpen((prev) => !prev);
      setBodyHeight(bodyEl ? bodyEl.offsetHeight : 0);
    }
  };
  return (
    <ButtonBase
      sx={{
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        p: 1,
        borderRadius: 1,
        "& .MuiTouchRipple-root *": {
          backgroundColor: alpha(blueGrey[900], 0.32),
        },
        " *": {
          cursor: "pointer !important",
        },
      }}
      onClick={handleClick}
    >
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Typo
          lines={2}
          sx={
            inMainTab
              ? {
                  flex: 1,
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: "700",
                  color: blueGrey[900],
                }
              : {
                  flex: 1,
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: "700",
                  color: blueGrey[900],
                }
          }
        >
          {title}
        </Typo>
        {!inMainTab && (
          <Icon
            name="angle-down"
            size={16}
            sx={{
              ml: "auto",
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: `all 0.35s ease`,
            }}
          />
        )}
      </Box>
      {!inMainTab && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: open ? bodyHeight + 12 : 0,
            transition: `all 0.35s ease`,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              pt: 1,
              pb: 0.5,
            }}
          >
            <Box
              sx={{
                p: theme.spacing(2),
                backgroundColor: blueGrey[50],
                borderRadius: 1,
              }}
              className={!inMainTab ? `NoticeItem-${id}-body` : ""}
            >
              <Typo
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: '700'
                }}
              >
                {body}
              </Typo>
            </Box>
          </Box>
        </Box>
      )}
      <Typo
        sx={
          inMainTab
            ? {
                mt: 0.5,
                fontSize: 12,
                lineHeight: "16px",
                color: blueGrey[700],
              }
            : {
                mt: 0.5,
                fontSize: 12,
                lineHeight: "16px",
                color: blueGrey[700],
              }
        }
      >
        {displayedAt(createdAt, inMainTab)}
      </Typo>
    </ButtonBase>
  );
}
