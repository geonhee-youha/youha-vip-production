import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import youhaBlue from "../../themes/youhaBlue";
import Icon from "./Icon";

export default function DataCell({
  tempCheck,
  checked,
  label,
  value,
  tooltip,
}: {
  tempCheck?: boolean;
  checked?: boolean;
  label: string;
  value: React.ReactNode;
  tooltip?: string;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& *": {
          textAlign: "center",
        },
        p: 1,
      }}
    >
      <Box>
        <Stack direction="row" spacing={1}>
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              color: checked
                ? tempCheck
                  ? blueGrey[900]
                  : youhaBlue[500]
                : blueGrey[700],
            }}
          >
            {label}
          </Typography>
        </Stack>
        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "700",
            color: checked
              ? tempCheck
                ? blueGrey[900]
                : youhaBlue[500]
              : blueGrey[900],
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
