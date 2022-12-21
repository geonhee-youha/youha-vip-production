import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import Container from "../../components/atoms/Container";
import Typography from "../../components/atoms/Typography";
import { pageDefaultProps, pages } from "../../contants/pages";
import newGrey from "../../core/colors/newGrey";
import { theme } from "../../themes/theme";

export default function Page() {
  const router = useRouter();
  const pathname = router.pathname;
  const page =
    pages
      .flatMap((el) => el.pages)
      .find((el) => el && el.href === `${pathname}`) ?? pageDefaultProps;
  const { titles, descriptions } = page;
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
    </Container>
  );
}
