import { Box, Stack } from "@mui/material";
import Container from "../../components/atoms/Container";
import Typography from "../../components/atoms/Typography";
import newGrey from "../../core/colors/newGrey";
import { theme } from "../../themes/theme";

export default function Page() {
  return (
    <Container full>
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
          Terms of use
        </Typography>
      </Stack>
      <Stack
        spacing={2}
        sx={{
          p: theme.spacing(0, 0, 8, 0),
          "@media(max-width: 828px)": {
            p: theme.spacing(0, 0, 5, 0),
          },
        }}
      >
        <Typography variant="subtitle-1">
          Terms and Use for YOUHA Design System
        </Typography>
        <Typography
          variant="body-2"
          color={newGrey[600]}
          sx={{
            "> p:not(:nth-child(1))": {
              m: theme.spacing(1, 0, 0, 0),
            },
          }}
        >
          <p>
            YOUHA Design System (YOUHA Design System에 있는 모든 콘텐츠를
            포함하며 이하 총칭하여 "본 시스템"이라 합니다)을 이용하는 경우에는
            YOUHA Design System 이용약관이 적용됩니다. 더불어 본 시스템은 YOUHA
            이용약관(이하 "YOUHA 이용약관"이라 합니다)에서 규정하는 "본 서비스"
            또는 "본 콘텐츠"의 일부로 간주되며, 본 시스템 이용에는 YOUHA
            이용약관도 함께 적용됩니다.
          </p>
          <p>
            본 시스템에 포함되거나 관련된 모든 권리는 티켓플레이스 주식회사에
            귀속됩니다. 본 시스템은 티켓플레이스의 브랜드 및 디자인 시스템의
            홍보 목적을 위해서만 제공되는 것이며 이 목적을 위해 열람하는 것에
            한정하여 이용할 수 있습니다. 당사의 별도 허락이 없는 한, YOUHA
            Design System 이용약관에서 명시하고 있지 않은 이용(본 시스템의 전부
            또는 일부의 복제, 배포, 수정을 포함합니다만 이에 한정되지
            않습니다)은 할 수 없습니다.
          </p>
        </Typography>
      </Stack>
    </Container>
  );
}
