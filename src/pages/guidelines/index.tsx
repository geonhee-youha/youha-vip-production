import { Box, Stack } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import Card from "../../components/atoms/Card";
import Container from "../../components/atoms/Container";
import Typography from "../../components/atoms/Typography";
import { pageDefaultProps, pages } from "../../contants/pages";
import newGrey from "../../core/colors/newGrey";
import { theme } from "../../themes/theme";

export default function Page() {
  const router = useRouter();
  const pathname = router.pathname;
  const page =
    pages.find((el) => el.href === `${pathname}`) ?? pageDefaultProps;
  const { titles, descriptions } = page;
  const intros = pages.flatMap((el) => {
    if (el.pages !== undefined) return el.pages;
  });
  return (
    <Container>
      <Stack
        spacing={2}
        sx={{
          p: theme.spacing(15, 0, 10, 0),
          m: theme.spacing(0, 0, 10, 0),
          "@media(max-width: 828px)": {
            p: theme.spacing(5, 0),
            m: theme.spacing(0, 0, 5, 0),
          },
          borderBottom: `1px solid ${newGrey[200]}`,
        }}
      >
        <Typography
          variant="heading-2"
          mobileVariant="heading-3"
          fontWeight="900"
        >
          {titles['page']}
        </Typography>
        <Typography
          variant="body-1"
          mobileVariant="body-2"
          color={newGrey[600]}
        >
          {descriptions['page']}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(3, 1fr)`,
          gridRowGap: 64,
          gridColumnGap: 32,
          "@media(max-width: 828px)": {
            gridTemplateColumns: `repeat(1, 1fr)`,
            gridRowGap: 40,
            gridColumnGap: 0,
          },
        }}
      >
        {intros.map((item, index) => {
          return (
            item !== undefined && <Card key={index} size="md" item={item} />
          );
        })}
      </Box>
    </Container>
  );
}
