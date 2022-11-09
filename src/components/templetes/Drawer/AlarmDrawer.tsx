import { Box, IconButton, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { alarmDrawerState } from "../../../recoil";
import { theme } from "../../../themes/theme";
import Icon from "../../atoms/Icon";
import EmptyItem from "../../organisms/EmptyItem";
const mainTabWidth = 376;
export default function AlarmDrawer() {
  const router = useRouter();
  const [alarmDrawer, setAlarmDrawer] = useRecoilState(alarmDrawerState);
  const { open } = alarmDrawer;
  useEffect(() => {
    handleClose();
  }, [router]);
  const handleClose = () => {
    setAlarmDrawer((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: 24,
        bottom: 24,
        left: mainTabWidth + 48,
        width: mainTabWidth,
        transform: open ? 0 : `translateX(-${mainTabWidth + 24}px)`,
        "@media(min-width: 1600px)": {
          left: `calc((100vw - 1600px) / 2 + ${mainTabWidth + 48}px)`,
        },
        borderRadius: 1,
        backgroundColor: "#ffffff",
        zIndex: 99998,
        transition: `transform 0.35s ease`,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: theme.spacing(2, 2.5, 2, 3),
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            p: theme.spacing(0.5, 0),
            fontSize: 20,
            lineHeight: "32px",
            fontWeight: "700",
            mr: "auto",
          }}
        >
          알림
        </Typography>
        <IconButton
          sx={{
            width: 40,
            height: 40,
            p: theme.spacing(1, 1),
          }}
          onClick={handleClose}
        >
          <Icon name="xmark" prefix="fas" size={20} color={blueGrey[400]} />
        </IconButton>
      </Box>
      <Box
        sx={{
          p: theme.spacing(0, 3, 3, 3),
        }}
      >
        <EmptyItem />
      </Box>
    </Box>
  );
}
