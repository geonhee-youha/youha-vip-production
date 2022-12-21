// import { Box } from "@mui/material";
// import _ from "lodash";
// import Card from "../components/atoms/Card";
// import Typography from "../components/atoms/Typography";
// import { theme } from "../themes/theme";
// import { useInView } from "react-intersection-observer";
// import Container from "../components/atoms/Container";
// import { pages } from "../contants/pages";
// export default function Page() {
//   return (
//     <Container full>
//       <IntroSection />
//     </Container>
//   );
// }

// function IntroSection() {
//   const { ref, inView } = useInView();
//   const animatedStyle = {
//     opacity: inView ? 1 : 0,
//     transform: `translateY(${inView ? 0 : "120px"})`,
//   };
//   const intros = pages.flatMap((el) => {
//     if (el.pages !== undefined) return el.pages;
//   });
//   return (
//     <Box
//       ref={ref}
//       sx={{
//         transition: `all 1.5s ease`,
//         ...animatedStyle,
//       }}
//     >
//       <Box
//         sx={{
//           p: theme.spacing(12, 0),
//           "@media(max-width: 828px)": {
//             p: theme.spacing(6, 0),
//           },
//         }}
//       >
//         <Typography
//           variant="heading-1"
//           mobileVariant="heading-3"
//           fontWeight="900"
//         >
//           With YOUHA<span className="blue">.</span>Design System,
//           <br />
//           We can communicate in
//           <br />
//           one unified design language<span className="blue">.</span>
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: `repeat(3, 1fr)`,
//           gridRowGap: 96,
//           gridColumnGap: 32,
//           "@media(max-width: 828px)": {
//             gridTemplateColumns: `repeat(1, 1fr)`,
//             gridRowGap: 48,
//             gridColumnGap: 0,
//           },
//         }}
//       >
//         {intros.map((item, index) => {
//           return (
//             item !== undefined && <Card key={index} size="lg" item={item} />
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }

import { alpha, Box, ButtonBase, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dynamic from "next/dynamic";
import Icon from "../components/atoms/Icon";
import { theme } from "../themes/theme";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Page() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}
      className="container"
    >
      <Header />
      <Intro />
      <Info />
    </Box>
  );
}

export function Header() {
  const router = useRouter();
  const onClickLogo = () => {
    router.push(`/`);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
        // background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0))`,
        "& img": {
          width: "auto",
          height: 24,
        },
      }}
    >
      <img src="/logos/collab-white.png" onClick={onClickLogo} />
    </Box>
  );
}

function Intro() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const className = inView ? "shown" : "";
  const onClickDown = () => {
    var container: any = document.querySelector(".container");
    var info: any = document.querySelector(".info");
    if (container !== null) {
      container.scrollBy({
        top: info.getBoundingClientRect().top,
        behavior: "smooth",
      });
    }
  };
  const onClickButton = () => {
    router.push(`pairing`);
  };
  return (
    <Box
      sx={{
        scrollSnapAlign: "center",
        position: "relative",
        height: "100vh",
        "& video": {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
        },
      }}
    >
      <ReactPlayer
        url="https://jellysmack.com/wp-content/uploads/2022/02/ADDTL_jellysmack_longform_1920x1080_SANSattribution.mp4"
        playing
        muted
        loop
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,1))`,
          p: theme.spacing(7, 0),
          zIndex: 9,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          ref={ref}
          sx={{
            p: theme.spacing(10, 3),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 40,
              lineHeight: "52px",
              fontWeight: "900",
              textAlign: "center",
              color: "#ffffff",
              transform: "translateY(100%)",
              opacity: 0,
              transition: "all 0.35s ease",
              "&.shown": {
                transform: "translateY(0)",
                opacity: 1,
              },
              transitionDelay: `0s`,
            }}
            className={className}
          >
            최대 2억원,
          </Typography>
          <Typography
            sx={{
              fontSize: 40,
              lineHeight: "52px",
              fontWeight: "900",
              textAlign: "center",
              color: "#ffffff",
              transform: "translateY(100%)",
              opacity: 0,
              transition: "all 0.35s ease",
              "&.shown": {
                transform: "translateY(0)",
                opacity: 1,
              },
              transitionDelay: `0.5s`,
            }}
            className={className}
          >
            당신의 유튜브를
          </Typography>
          <Typography
            sx={{
              fontSize: 40,
              lineHeight: "52px",
              fontWeight: "900",
              textAlign: "center",
              color: "#ffffff",
              transform: "translateY(100%)",
              opacity: 0,
              transition: "all 0.35s ease",
              "&.shown": {
                transform: "translateY(0)",
                opacity: 1,
              },
              transitionDelay: `1s`,
            }}
            className={className}
          >
            지원합니다.
          </Typography>
          <ButtonBase
            sx={{
              background: `linear-gradient(90deg, rgb(4,232,78, 1), rgb(28,90,246, 1)) !important`,
              color: "#ffffff",
              height: 44,
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: "700",
              borderRadius: 0.5,
              justifyContent: "center",
              alignItems: "center",
              p: theme.spacing(0, 2.5),
              transform: "translateY(100%)",
              opacity: 0,
              "&.shown": {
                transform: "translateY(0)",
                opacity: 1,
              },
              transitionDelay: `1.5s`,
              m: theme.spacing(3, 0, 0, 0),
            }}
            className={className}
            onClick={onClickButton}
          >
            <Icon
              name="coins"
              prefix="fas"
              color="#ffffff"
              size={20}
              sx={{ mr: 1 }}
            />
            지금 바로 내 한도 확인하기
          </ButtonBase>
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          bottom: 24,
          transform: "translateX(-50%)",
          zIndex: 9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: 0,
          transition: `all 0.35s ease`,
          "&.shown": {
            opacity: 1,
            "& svg": {
              transition: `all 0.35s ease`,
              transform: `rotate(0deg)`,
            },
          },
          "& svg": {
            transition: `all 0.35s ease`,
            transform: `rotate(180deg)`,
          },
        }}
        className={className}
        onClick={onClickDown}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: "#ffffff",
            textAlign: "center",
            "& b": {
              fontWeight: "700",
            },
          }}
        >
          <b>크리에이터 펀딩</b>
          <br />더 알아보기
        </Typography>
        <Box
          sx={{
            m: theme.spacing(1, 0, 0, 0),
            animation: `up-down 1.5s infinite linear`,
            "@keyframes up-down": {
              "0%, 100%": {
                transform: "translateY(4px)",
              },
              "50%": {
                transform: "translateY(-4px)",
              },
            },
            transition: `all 0.35s ease`,
          }}
        >
          <Icon name="chevrons-down" color="#ffffff" size={24} />
        </Box>
      </Box>
    </Box>
  );
}

function Info() {
  const { ref, inView } = useInView();
  const className = inView ? "shown" : "";
  return (
    <Box
      sx={{
        scrollSnapAlign: "start",
        position: "relative",
        background: `linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))`,
      }}
      className="info"
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          jellysmack webpage를 기반으로 해
          <br />
          금번 펀딩에 관한 설명을 추가할 예정입니다.
          <br />
          <br />
          - 기업 및 펀딩 소개
          <br />
          - 펀딩 성공 사례
          <br />
          - 펀딩 프로세스
          <br />
          - 펀딩 조건
          <br />- 상세 정보 (플랜, 한도 등)
        </Typography>
      </Box>
    </Box>
  );
}
