import { Box, Stack, Typography } from "@mui/material";
import {
  deepOrange,
  deepPurple,
  indigo,
  orange,
  purple,
  red,
} from "@mui/material/colors";
import _ from "lodash";
import AdItem from "../../components/organisms/AdItem";
import { adStatuses } from "../../constants";
import { AdProps } from "../../datas";
import { theme } from "../../themes/theme";

export const colors = [
  indigo,
  orange,
  purple,
  deepOrange,
  deepPurple,
  red,
  indigo,
  orange,
  purple,
  deepOrange,
  deepPurple,
  red,
  indigo,
  orange,
  purple,
  deepOrange,
  deepPurple,
  red,
  indigo,
  orange,
  purple,
  deepOrange,
  deepPurple,
  red,
];

export default function AdBoard({ ads }: { ads: AdProps[] }) {
  return (
    <Box
      sx={{
        p: theme.spacing(0, 3, 2, 40 + (448 - 375) / 8),
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          width: 1200,
          display: "grid",
          gridTemplateColumns: `repeat(${adStatuses.length - 3}, 1fr)`,
          gridAutoColumn: "1fr",
          gridTemplateRows: "auto",
          gridRowGap: 8,
          gridColumnGap: 16,
          p: theme.spacing(0, 3, 2, 3),
        }}
      >
        {adStatuses.map((item, i) => {
          return i < 2 || i > 6 ? null : (
            <Box
              key={i}
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: item.backgroundColor,
                  borderRadius: 1,
                  p: theme.spacing(1, 2),
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    fontWeight: "700",
                    color: item.color,
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          width: 1200,
          display: "grid",
          gridTemplateColumns: `repeat(${adStatuses.length - 3}, 1fr)`,
          gridAutoColumn: "1fr",
          gridTemplateRows: "auto",
          gridRowGap: 8,
          gridColumnGap: 16,
          p: theme.spacing(0, 3, 20, 3),
        }}
      >
        {adStatuses.map((item, i) => {
          return i < 2 || i > 6 ? null : (
            <Stack spacing={1} key={i} sx={{ flex: 1 }}>
              {_.filter(ads, (el) => el.status.value === item.value).map(
                (item, index) => {
                  return <AdItem key={index} item={item} />;
                }
              )}
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
}
