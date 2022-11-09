import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { RecoilRoot } from "recoil";
import "../styles/main.css";
import "../styles/reset.ts";
import "swiper/css";
import "swiper/css/pagination";
import { theme } from "../themes/theme";
import { useRouter } from "next/router";
import { CacheProvider, EmotionCache, Global } from "@emotion/react";
import { createEmotionCache } from "../utils";
import reset from "../styles/reset";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  BarController,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  Tooltip,
  Legend,
  RadialLinearScale,
  PieController,
  DoughnutController,
} from "chart.js";
import { blueGrey } from "@mui/material/colors";
import { Box, Paper, Stack } from "@mui/material";
import MainTab from "../components/templetes/MainTab";
import AlarmDrawer from "../components/templetes/Drawer/AlarmDrawer";
import _ from "lodash";
import { pages } from "../constants";
import CampaignDrawer from "../components/templetes/Drawer/CampaignDrawer";
import SearchDrawer from "../components/templetes/Drawer/SearchDrawer";
import AlertDialog from "../components/templetes/Dialog/AlertDialog";
import BackDrop from "../components/atoms/Backdrop";
import CampaignPopup from "../components/templetes/Popup/CampaignPopup";
import CreatorPopup from "../components/templetes/Popup/CreatorPopup";
import CampaignDialog from "../components/templetes/Dialog/CampaignDialog";
import CreatorDrawer from "../components/templetes/Drawer/CreatorDrawer";
import EstimateConfirmDialog from "../components/templetes/Dialog/EstimateConfirmDialog";
import AdDialog from "../components/templetes/Dialog/AdDialog";
import EstimateDrawer from "../components/templetes/Drawer/EstimateDrawer";
import CreatorDialog from "../components/templetes/Dialog/CreatorDialog";
import AdSetDialog from "../components/templetes/Dialog/AdSetDialog";
import PlaylistDialog from "../components/templetes/Dialog/PlaylistDialog";
import EstimateDialog from "../components/templetes/Dialog/EstimateDialog";
ChartJS.register(
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  PieController,
  DoughnutController,
  Tooltip,
  Legend
);
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const { library, config } = require("@fortawesome/fontawesome-svg-core");
library.add(fal, far, fas, fad);
declare global {
  interface Window {
    webkit?: any;
    ReactNativeWebView?: any;
  }
}
function MyApp(props: MyAppProps) {
  const router = useRouter();
  const currentPathName = `/${router.pathname.split("?")[0].split("/")[1]}`;
  const inMainTabs =
    _.findIndex(pages, (el) => el.pathName === currentPathName) !== -1;
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <title>유튜버 찾을 땐, 유하</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        <meta name="keywords" content="유하, 유튜브, 유튜버, 광고" />
        <meta
          name="description"
          content="유하에서 국내 모든 유튜버에게 광고를 제안하고 답장을 100% 받아보세요. 광고주와 유튜버의 인플루언서 마케팅 커뮤니티 (브랜디드 콘텐츠, PPL 등)"
        />
        ㄴ
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="유하" />
        <meta property="og:title" content="유튜버 찾을 땐, 유하" />
        <meta
          property="og:description"
          content="유하에서 국내 모든 유튜버에게 광고를 제안하고 답장을 100% 받아보세요. 광고주와 유튜버의 인플루언서 마케팅 커뮤니티 (브랜디드 콘텐츠, PPL 등)"
        />
        <meta property="og:image" content="/images/favicon/share.png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://youha.info" />
        <meta name="twitter:card" content="summary" data-react-helmet="true" />
        <meta name="twitter:creator" content="" data-react-helmet="true" />
        <meta
          name="twitter:title"
          content="유튜버 찾을 땐, 유하"
          data-react-helmet="true"
        />
        <meta
          name="twitter:description"
          content="유하에서 국내 모든 유튜버에게 광고를 제안하고 답장을 100% 받아보세요. 광고주와 유튜버의 인플루언서 마케팅 커뮤니티 (브랜디드 콘텐츠, PPL 등)"
          data-react-helmet="true"
        />
        <meta name="twitter:image" content="/images/share.png" />
        <meta name="HandheldFriendly" content="true" />
        <link
          rel="shortcut icon"
          href="/images/favicon/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="144x144"
          href="/favicon/android-icon-144x144.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/favicon/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/images/favicon/ms-icon-144x144.png"
        />
        <script src="https://js.pusher.com/3.2/pusher.min.js" />
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> */}
        {/* "Mixed content blocked" when running an HTTP AJAX operation in an HTTPS page */}
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        {/* <!-- jQuery --> */}
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"
        ></script>
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Global styles={reset} />
          {!inMainTabs ? (
            <Component {...pageProps} key={router.route} />
          ) : (
            <>
              <BackDrop />
              <Box
                sx={{
                  position: "relative",
                  m: `0 auto`,
                  width: 1600,
                  height: "100%",
                  // overflow: "auto",
                }}
                className="GlobalContainer"
              >
                <MainTab />
                <CampaignDrawer />
                <CreatorDrawer />
                <EstimateDrawer />
                {/* <CreatorDrawer />
              <CampaignDrawer />
              <CampaignDialog />
              <CreatorDialog />
              <EstimateConfirmDialog />
              <AdDialog />
              <PlanDialog />
              <EstimateInputDialog />
              <AlarmDrawer />
              <SearchDrawer /> */}
                <Stack
                  spacing={2}
                  sx={{
                    position: "absolute",
                    top: 24,
                    bottom: 24,
                    right: 24,
                    left: 376 + 24 + 16,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      height: 72,
                      borderRadius: 1,
                      boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
                      // border: `1px solid ${blueGrey[300]}`
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    배너
                  </Paper>
                  <Box
                    sx={{
                      position: "relative",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      <Component {...pageProps} key={router.route} />
                    </Box>
                  </Box>
                </Stack>
                <CampaignPopup />
                <CreatorPopup />
                <EstimateConfirmDialog />
                <CampaignDialog />
                <CreatorDialog />
                <PlaylistDialog />
                <AlertDialog />
                <AdDialog />
                <AdSetDialog />
                <EstimateDialog />
              </Box>
            </>
          )}
        </ThemeProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}
export default MyApp;
