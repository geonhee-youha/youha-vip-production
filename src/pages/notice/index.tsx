import { Box, Paper, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import Panel from "../../components/atoms/Panel";
import NoticeItem from "../../components/organisms/NoticeItem";
import { pages } from "../../constants";
import { testNotices } from "../../datas";
import { theme } from "../../themes/theme";
export default function Page() {
  const router = useRouter();
  const queryName = router.pathname;
  const currentPathName = `/${router.pathname.split("?")[0].split("/")[1]}`;
  const currentSlugPathName = `/${router.pathname.split("?")[0].split("/")[2]}`;
  const pageTitle =
    currentSlugPathName !== "/undefined"
      ? _.findLast(
          _.findLast(pages, (el) => el.pathName === currentPathName)?.slugs,
          (el) => el.pathName === currentSlugPathName
        )?.title
      : _.findLast(pages, (el) => el.pathName === currentPathName)?.title;
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: 1,
        boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
        className={`PaperTarget-${queryName}`}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            p: theme.spacing(2, 2, 2, 2),
            backgroundColor: "#ffffff",
            zIndex: 98,
            "&:after": {
              position: "absolute",
              left: 24,
              right: 24,
              bottom: 16,
              height: `1px`,
              backgroundColor: blueGrey[50],
              content: '""',
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 24,
                lineHeight: "40px",
                fontWeight: "700",
                mr: "auto",
              }}
            >
              {pageTitle}
            </Typography>
          </Box>
        </Box>
        <Stack
          spacing={1}
          sx={{
            p: theme.spacing(0, 2, 2, 2),
          }}
        >
          {testNotices.map((item, index) => (
            <NoticeItem key={index} item={item} />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
