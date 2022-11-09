import { Box, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import Icon from "../atoms/Icon";
export default function EmptyItem() {
  return (
    <Box
      sx={{
        height: 200,
        p: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        name="exclamation-circle"
        prefix="fal"
        color={blueGrey[400]}
        size={32}
      />
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: "20px",
          color: blueGrey[400],
          mt: 1,
        }}
      >
        현재 알림이 없습니다!
      </Typography>
    </Box>
  );
}
