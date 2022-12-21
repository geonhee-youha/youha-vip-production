import { Box, ButtonBase, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";
import { Header } from ".";
import { theme } from "../themes/theme";
import { comma } from "../utils";

const examples = [
  {
    src: "https://images.axios.com/78wSW59uOBxN6c2bLQxFA_t38Y0=/700x0:3367x2667/1600x1600/2022/10/24/1666642218954.jpg",
    title: "Mr.Beast",
    budget: 3000000,
    dialog: `“제 라이브러리에 대해 평가를 받고 몇 년 간 제작한 동영상이 얼마나 가치가 있는지 알 수 있게 되어 정말 기뻤습니다. 제가 이미 제작한 콘텐츠를 이용하여 새로운 수익을 창출하고 다른 프로젝트에 적용할 수 있으니 정말 놀라웠죠.”`,
  },
  {
    src: "https://jellysmack.com/wp-content/uploads/2022/08/Screen-Shot-2022-08-09-at-9.27.09-AM-e1660147208277.png",
    title: "Gaba",
    budget: 3000000,
    dialog: `“제 라이브러리에 대해 평가를 받고 몇 년 간 제작한 동영상이 얼마나 가치가 있는지 알 수 있게 되어 정말 기뻤습니다. 제가 이미 제작한 콘텐츠를 이용하여 새로운 수익을 창출하고 다른 프로젝트에 적용할 수 있으니 정말 놀라웠죠.”`,
  },
  {
    src: "https://jellysmack.com/wp-content/uploads/2022/08/br-mandy-candy-1-e1660146990512.jpeg",
    title: "RR Buildings",
    budget: 3000000,
    dialog: `"Jellysmack 덕분에 정말 쉬워졌어요… 저는 수표를 선불로 받아서 하루 만에 제 미래에 직접 다시 투자할 수 있었습니다."`,
  },
  {
    src: "https://jellysmack.com/wp-content/uploads/2022/08/rr_buildings-e1660165901999.jpg",
    title: "Gaba",
    budget: 3000000,
    dialog: `“제 라이브러리에 대해 평가를 받고 몇 년 간 제작한 동영상이 얼마나 가치가 있는지 알 수 있게 되어 정말 기뻤습니다. 제가 이미 제작한 콘텐츠를 이용하여 새로운 수익을 창출하고 다른 프로젝트에 적용할 수 있으니 정말 놀라웠죠.”`,
  },
  {
    src: "https://yt3.ggpht.com/zQe7ypCPRCJraUm2N13qTVrSDcfBHnffhtf1aQj5PzQopslprvF1Yrak_pblon5ht4IcPG6l=s900-c-k-c0x00ffffff-no-rj",
    title: "디바제시카",
    budget: 3000000,
    dialog: `“제 라이브러리에 대해 평가를 받고 몇 년 간 제작한 동영상이 얼마나 가치가 있는지 알 수 있게 되어 정말 기뻤습니다. 제가 이미 제작한 콘텐츠를 이용하여 새로운 수익을 창출하고 다른 프로젝트에 적용할 수 있으니 정말 놀라웠죠.”`,
  },
  {
    src: "https://blog.kakaocdn.net/dn/cGHXJg/btrv6X0MNuO/FExP1GA4CV5aEYdn0i9h31/img.png",
    title: "수빙수tv",
    budget: 3000000,
    dialog: `“제 라이브러리에 대해 평가를 받고 몇 년 간 제작한 동영상이 얼마나 가치가 있는지 알 수 있게 되어 정말 기뻤습니다. 제가 이미 제작한 콘텐츠를 이용하여 새로운 수익을 창출하고 다른 프로젝트에 적용할 수 있으니 정말 놀라웠죠.”`,
  },
  {
    src: "https://yt3.googleusercontent.com/ytc/AMLnZu_AOWkUT0yEUvsJCsao3ZTJ-jhSsRqES45jKFyTVw=s176-c-k-c0x00ffffff-no-rj",
    title: "야미보이",
    budget: 3000000,
    dialog: `“제 라이브러리에 대해 평가를 받고 몇 년 간 제작한 동영상이 얼마나 가치가 있는지 알 수 있게 되어 정말 기뻤습니다. 제가 이미 제작한 콘텐츠를 이용하여 새로운 수익을 창출하고 다른 프로젝트에 적용할 수 있으니 정말 놀라웠죠.”`,
  },
];

const itemSize = 480;

export default function Page() {
  const onClickButton = () => {};
  return (
    <Box
      sx={{
        height: "100%",
        background: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))`,
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            p: theme.spacing(10, 3, 3, 3),
            width: "100%",
            maxWidth: 600,
            m: theme.spacing(0, "auto"),
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              lineHeight: "40px",
              fontWeight: "900",
              color: "#ffffff",
            }}
          >
            페어링 한번으로
            <br />
            한도를 조회하세요.
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: "24px",
              color: grey[500],
              mt: 1,
            }}
          >
            당신의 유튜브 채널을 페어링하고
            <br />
            가장 나은 제안을 찾아 드릴게요.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            minHeight: `${itemSize}px`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              p: theme.spacing(0, 0, 10, 0),
            }}
          >
            <Gallery />
            <Gallery />
            <Gallery />
          </Box>
        </Box>
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            p: theme.spacing(3),
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 600,
              bottom: 0,
              m: theme.spacing(0, "auto"),
            }}
          >
            <ButtonBase
              sx={{
                width: "100%",
                background: "#ffffff",
                color: grey[900],
                height: 44,
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
                borderRadius: 0.5,
                justifyContent: "flex-start",
                alignItems: "center",
                p: theme.spacing(0, 2.5),
              }}
              onClick={onClickButton}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <img src="/logos/google.png" />
              </Box>
              구글 계정으로 로그인
            </ButtonBase>
            <Typography
              sx={{
                fontSize: 12,
                color: grey[500],
                "& b": {
                  fontWeight: "700",
                },
                mt: 1,
              }}
            >
              Jellysmack과 youha는 창작자의 데이터를 제3자에게 판매하지
              않습니다.
              <br />
              한도를 조회하신 후에는 언제든지 페어링을 해제할 수 있습니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Gallery() {
  return (
    <Box
      sx={{
        display: "flex",
        animation: `swipe 15000ms linear infinite backwards`,
        "@keyframes swipe": {
          "0%": {
            transform: `translate(0)`,
          },
          "100%": {
            transform: `translate(-100%)`,
          },
        },
      }}
    >
      {examples.map((item, index) => {
        const { src, title, budget, dialog } = item;
        const size = 224;
        return (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: size,
              p: theme.spacing(0, 3, 0, 0),
              height: `${itemSize}px`,
            }}
          >
            <Box
              sx={{
                width: size - 24,
                height: size - 24,
                background: `linear-gradient(270deg,#00d1b0 0,#00e94f 48.96%,#0093ff 73.96%,#e08af4 97.92%)`,
                p: theme.spacing(0.25),
                borderRadius: 224,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000000",
                  boxShadow: `4px 4px 16px 0px rgba(0, 0, 0, 0.4)`,
                  overflow: "hidden",
                  backgroundImage: `url(${src})`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `auto 100%`,
                  backgroundPosition: `center center`,
                  borderRadius: 224,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(rgb(0,0,0,0.2), rgb(0,0,0,0.0.2))`,
                  }}
                ></Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: "900",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                투자액 {comma(budget)}원
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 14,
                  color: grey[500],
                }}
              >
                {dialog ?? ""}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
