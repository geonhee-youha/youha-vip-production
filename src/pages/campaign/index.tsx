import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  blue,
  blueGrey,
  cyan,
  green,
  indigo,
  pink,
  red,
  teal,
} from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Icon from "../../components/atoms/Icon";
import Panel from "../../components/atoms/Panel";
import CreatorItem from "../../components/organisms/CreatorItem";
import {
  testCampaignsState,
  testCreators,
  testPlaylists,
  testVideos,
} from "../../datas";
import { campaignPopupState } from "../../recoil";
import PlaylistItem from "../../components/organisms/PlaylistItem";
import { theme } from "../../themes/theme";
import { Chart } from "react-chartjs-2";
import CampaignRightTabItem from "../../components/organisms/CampaignMainTabItem";
import VideoItem from "../../components/organisms/VideoItem";
import { ageFilter, pages } from "../../constants";
import Slide from "../../components/atoms/Slide";
import CampaignItem from "../../components/organisms/CampaignItem";

export default function Index() {
  const router = useRouter();
  const currentPathName = `/${router.pathname.split("?")[0].split("/")[1]}`;
  const currentSlugPathName = `/${router.pathname.split("?")[0].split("/")[2]}`;
  const pageTitle =
    currentSlugPathName !== "/undefined"
      ? `${
          _.findLast(
            _.findLast(pages, (el) => el.pathName === currentPathName)?.slugs,
            (el) => el.pathName === currentSlugPathName
          )?.title
        }`
      : `${_.findLast(pages, (el) => el.pathName === currentPathName)?.title}`;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [opens, setOpens] = useState<boolean[]>([true, true]);
  const testCampaigns = useRecoilValue(testCampaignsState);
  const setCampaignPopup = useSetRecoilState(campaignPopupState);
  const campaigns = [...testCampaigns];
  const handleClickNewCampaign = () => {
    setCampaignPopup((prev) => {
      return {
        ...prev,
        open: true,
        mode: "add",
      };
    });
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          border: `1px solid ${blueGrey[100]}`,
          flex: 1,
          boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
          backgroundColor: "#ffffff",
          borderRadius: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: 36,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              top: 36,
              height: 40,
              left: 0,
              right: 0,
              boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
              zIndex: 2,
            }}
          ></Paper>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              height: 36,
              left: 0,
              right: 0,
              backgroundColor: blueGrey[50],
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              flexWrap: "nowrap",
              overflowX: "scroll",
            }}
            className="Container"
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              {campaigns.map((item, index) => {
                const focused = tabIndex === index;
                const handleClick = () => {
                  let containerEl: any = document.querySelector(`.Container`);
                  let targetEl: any = document.querySelector(
                    `.CampaignItem-${index}`
                  );
                  containerEl.scrollTo({
                    top: 0,
                    left: targetEl.offsetLeft - 48,
                    behavior: "smooth",
                  });
                  setTabIndex(index);
                };
                const handleClickEdit = (e: any) => {
                  e.preventDefault();
                  setCampaignPopup((prev) => {
                    return {
                      ...prev,
                      open: true,
                      mode: "edit",
                      id: item.id,
                    };
                  });
                };
                return (
                  <Box
                    key={index}
                    sx={{
                      flex: "0 0 auto",
                      borderTopLeftRadius: focused ? 8 : 0,
                      borderTopRightRadius: focused ? 8 : 0,
                      position: "relative",
                      "&:after": {
                        position: "absolute",
                        top: 8,
                        bottom: 8,
                        right: -2,
                        content: '""',
                        width: `1px`,
                        backgroundColor: blueGrey[400],
                        opacity: focused ? 0 : 1,
                      },
                      zIndex: focused ? 99 : 0,
                    }}
                    className={`CampaignItem-${index}`}
                  >
                    <Paper
                      elevation={focused ? 6 : 0}
                      sx={{
                        boxShadow: focused
                          ? `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`
                          : `none`,
                        backgroundColor: focused ? "#ffffff" : "transparent",
                        borderTopLeftRadius: focused ? 8 : 0,
                        borderTopRightRadius: focused ? 8 : 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        p: theme.spacing(1, 3.5, 1, 2),
                        display: "flex",
                        alignItems: "center",
                        zIndex: focused
                          ? campaigns.length * 2
                          : ((campaigns.length - index) / campaigns.length) *
                            campaigns.length,
                      }}
                      onClick={handleClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          fontWeight: "700",
                          color: focused ? blueGrey[800] : blueGrey[300],
                          mr: 0.5,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Paper>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 20,
                        height: 20,
                        p: 0,
                        zIndex: 98,
                      }}
                      onClick={handleClickEdit}
                    >
                      <Icon
                        name="pen"
                        prefix="fas"
                        size={12}
                        color={focused ? blueGrey[800] : blueGrey[300]}
                      />
                    </IconButton>
                  </Box>
                );
              })}
              <Box
                sx={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  p: theme.spacing(0, 1, 0, 1),
                  display: "flex",
                  alignItems: "center",
                  flex: "0 0 auto",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    width: 28,
                    height: 28,
                  }}
                  onClick={handleClickNewCampaign}
                >
                  <Icon
                    name="plus"
                    prefix="fas"
                    size={16}
                    color={blueGrey[300]}
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Paper
          sx={{
            flex: 1,
            boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            overflow: "hidden",
          }}
        >
          <SwipeableViews
            index={tabIndex}
            onChangeIndex={setTabIndex}
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            {testCampaigns.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <CampaignItem item={item} inHome />
                <Slide>
                  <Box
                    sx={{
                      p: theme.spacing(2, 2, 1, 2),
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 1,
                        p: theme.spacing(1),
                        fontSize: 18,
                        lineHeight: "28px",
                        fontWeight: "700",
                      }}
                    >
                      트렌드 인사이트
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: theme.spacing(0, 3, 3, 3),
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: 1,
                        display: "grid",
                        gridTemplateColumns: `repeat(${
                          _.filter(opens, (el) => el === true).length === 0
                            ? 3
                            : 2
                        }, 1fr)`,
                        gridAutoColumn: "1fr",
                        gridTemplateRows: "auto auto",
                        gridGap: 8,
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          position: "relative",
                          width: "100%",
                          backgroundColor: blueGrey[50],
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            lineHeight: "24px",
                            fontWeight: "700",
                            color: blueGrey[900],
                          }}
                        >
                          종합 성과 지수
                        </Typography>
                        <Box
                          sx={{
                            mt: 1,
                            mb: 1,
                            ml: "auto",
                            mr: "auto",
                            width: 120,
                            height: 120,
                            position: "relative",
                          }}
                        >
                          <Chart
                            type="pie"
                            data={totalChartData}
                            options={totalChartOptions}
                          />
                          <Stack
                            spacing={0}
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 32,
                                  lineHeight: "40px",
                                  fontWeight: "700",
                                  color: blueGrey[700],
                                  textAlign: "center",
                                }}
                              >
                                96
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  lineHeight: "28px",
                                  fontWeight: "700",
                                  color: blueGrey[700],
                                  textAlign: "center",
                                  ml: 0.25,
                                }}
                              >
                                점
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: 12,
                                lineHeight: "16px",
                                fontWeight: "700",
                                color: blueGrey[700],
                                textAlign: "center",
                              }}
                            >
                              아주 좋아요!
                            </Typography>
                          </Stack>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          backgroundColor: blueGrey[50],
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            lineHeight: "24px",
                            fontWeight: "700",
                            color: blueGrey[900],
                          }}
                        >
                          구글/네이버 키워드 지수
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            mb: 0,
                            ml: "auto",
                            mr: "auto",
                            // width: 120,
                            height: 120,
                            position: "relative",
                          }}
                        >
                          <Chart
                            type="line"
                            data={trendChartData}
                            options={trendChartOptions}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          backgroundColor: blueGrey[50],
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 16,
                            lineHeight: "24px",
                            fontWeight: "700",
                            color: blueGrey[900],
                          }}
                        >
                          SNS 바이럴 지수
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            mb: 0,
                            ml: "auto",
                            mr: "auto",
                            // width: 120,
                            height: 120,
                            position: "relative",
                          }}
                        >
                          <Chart
                            type="bar"
                            data={keywordChartData}
                            options={keywordChartOptions}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          backgroundColor: blueGrey[50],
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            lineHeight: "24px",
                            fontWeight: "700",
                            color: blueGrey[900],
                          }}
                        >
                          성별 지수
                        </Typography>
                        <Box
                          sx={{
                            mt: 1,
                            mb: 1,
                            ml: "auto",
                            mr: "auto",
                            width: 120,
                            height: 120,
                            position: "relative",
                          }}
                        >
                          <Chart
                            type="pie"
                            data={sexChartData}
                            options={sexChartOptions}
                          />
                          <Stack
                            spacing={0}
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-end",
                              }}
                            >
                              <Typography
                                sx={{
                                  flex: 1,
                                  fontSize: 12,
                                  lineHeight: "24px",
                                  fontWeight: "700",
                                  color: blueGrey[700],
                                  textAlign: "left",
                                  mr: 0.5,
                                }}
                              >
                                남성
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 18,
                                  lineHeight: "28px",
                                  fontWeight: "700",
                                  color: blueGrey[700],
                                  textAlign: "right",
                                  "& span": {
                                    fontSize: 14,
                                    lineHeight: "24px",
                                  },
                                }}
                              >
                                48.6<span>%</span>
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-end",
                              }}
                            >
                              <Typography
                                sx={{
                                  flex: 1,
                                  fontSize: 12,
                                  lineHeight: "24px",
                                  fontWeight: "700",
                                  color: blueGrey[700],
                                  textAlign: "left",
                                  mr: 0.5,
                                }}
                              >
                                여성
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 18,
                                  lineHeight: "28px",
                                  fontWeight: "700",
                                  color: blueGrey[700],
                                  textAlign: "right",
                                  "& span": {
                                    fontSize: 14,
                                    lineHeight: "24px",
                                  },
                                }}
                              >
                                51.2<span>%</span>
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          backgroundColor: blueGrey[50],
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            lineHeight: "24px",
                            fontWeight: "700",
                            color: blueGrey[900],
                          }}
                        >
                          연령 지수
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            mb: 0,
                            ml: "auto",
                            mr: "auto",
                            // width: 120,
                            height: 120,
                            position: "relative",
                          }}
                        >
                          <Chart
                            type="pie"
                            data={ageChartData}
                            options={ageChartOptions}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          backgroundColor: blueGrey[50],
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 16,
                            lineHeight: "24px",
                            fontWeight: "700",
                            color: blueGrey[900],
                          }}
                        >
                          이슈성 지수
                        </Typography>
                        <Box
                          sx={{
                            mt: 1,
                            mb: 1,
                            ml: "auto",
                            mr: "auto",
                            width: 120,
                            height: 120,
                            position: "relative",
                          }}
                        >
                          <Chart
                            type="pie"
                            data={issueChartData}
                            options={issueChartOptions}
                          />
                          <Stack
                            spacing={0}
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-end",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 32,
                                  lineHeight: "40px",
                                  fontWeight: "700",
                                  color: blueGrey[700],
                                  textAlign: "center",
                                }}
                              >
                                24.6
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  lineHeight: "28px",
                                  fontWeight: "700",
                                  color: blueGrey[700],
                                  textAlign: "center",
                                  ml: 0.25,
                                }}
                              >
                                %
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                fontSize: 12,
                                lineHeight: "16px",
                                fontWeight: "700",
                                color: blueGrey[700],
                                textAlign: "center",
                              }}
                            >
                              나쁘지 않군요.
                            </Typography>
                          </Stack>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: theme.spacing(2, 2, 1, 2),
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 1,
                        p: theme.spacing(1),
                        fontSize: 18,
                        lineHeight: "28px",
                        fontWeight: "700",
                      }}
                    >
                      추천 크리에이터
                    </Typography>
                    <ButtonBase
                      onClick={() => router.push("/insight/creator")}
                      sx={{
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: blueGrey[500],
                          fontWeight: "700",
                        }}
                      >
                        전체보기
                      </Typography>
                      <Icon
                        name="angle-right"
                        size={12}
                        prefix="fas"
                        color={blueGrey[500]}
                      />
                    </ButtonBase>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${
                        _.filter(opens, (el) => el === true).length === 0
                          ? 6
                          : 4
                      }, 1fr)`,
                      gridAutoColumn: "1fr",
                      gridTemplateRows: "auto auto",
                      gridRowGap: 8,
                      gridColumnGap: 8,
                      p: theme.spacing(0, 3, 3, 3),
                    }}
                    className="Container"
                  >
                    {testCreators.map((item, index) => {
                      return (
                        index <
                          (_.filter(opens, (el) => el === true).length === 0
                            ? 6
                            : 4) && (
                          <CreatorItem key={index} item={item} inHome />
                        )
                      );
                    })}
                  </Box>
                  <Box
                    sx={{
                      p: theme.spacing(2, 2, 1, 2),
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 1,
                        p: theme.spacing(1),
                        fontSize: 18,
                        lineHeight: "28px",
                        fontWeight: "700",
                      }}
                    >
                      추천 기획안
                    </Typography>
                    <ButtonBase
                      onClick={() => router.push("/insight/playlist")}
                      sx={{
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: blueGrey[500],
                          fontWeight: "700",
                        }}
                      >
                        전체보기
                      </Typography>
                      <Icon
                        name="angle-right"
                        size={12}
                        prefix="fas"
                        color={blueGrey[500]}
                      />
                    </ButtonBase>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${
                        _.filter(opens, (el) => el === true).length === 0
                          ? 5
                          : 3
                      }, 1fr)`,
                      gridAutoColumn: "1fr",
                      gridTemplateRows: "auto auto",
                      gridRowGap: 8,
                      gridColumnGap: 8,
                      p: theme.spacing(0, 3, 3, 3),
                    }}
                    className="Container"
                  >
                    {testPlaylists
                      .flatMap((el) => el.playlistItems)
                      .map((item, index) => {
                        return (
                          index <
                            (_.filter(opens, (el) => el === true).length === 0
                              ? 5
                              : 3) && <PlaylistItem key={index} item={item} />
                        );
                      })}
                  </Box>
                  <Box
                    sx={{
                      p: theme.spacing(2, 2, 1, 2),
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 1,
                        p: theme.spacing(1),
                        fontSize: 18,
                        lineHeight: "28px",
                        fontWeight: "700",
                      }}
                    >
                      추천 광고영상
                    </Typography>
                    <ButtonBase
                      onClick={() => router.push("/insight/video")}
                      sx={{
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: blueGrey[500],
                          fontWeight: "700",
                        }}
                      >
                        전체보기
                      </Typography>
                      <Icon
                        name="angle-right"
                        size={12}
                        prefix="fas"
                        color={blueGrey[500]}
                      />
                    </ButtonBase>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${
                        _.filter(opens, (el) => el === true).length === 0
                          ? 5
                          : 3
                      }, 1fr)`,
                      gridAutoColumn: "1fr",
                      gridTemplateRows: "auto auto",
                      gridRowGap: 8,
                      gridColumnGap: 8,
                      p: theme.spacing(0, 3, 3, 3),
                    }}
                    className="Container"
                  >
                    {testVideos.map((item, index) => {
                      return (
                        index <
                          (_.filter(opens, (el) => el === true).length === 0
                            ? 5
                            : 3) && <VideoItem key={index} item={item} />
                      );
                    })}
                  </Box>
                </Slide>
              </Box>
            ))}
          </SwipeableViews>
        </Paper>
      </Paper>
      {_.filter(opens, (el) => el === true).length > 0 && (
        <Stack spacing={2}>
          {[
            {
              title: "알림 리스트",
            },
            {
              title: "진행 리스트",
            },
          ].map((item, index) => {
            const { title } = item;
            return (
              <CampaignRightTabItem
                key={index}
                index={index}
                title={title}
                opens={opens}
                setOpens={setOpens}
              >
                <Stack
                  spacing={1}
                  sx={{
                    p: theme.spacing(1, 2),
                  }}
                >
                  {(index === 0
                    ? [
                        {
                          body: "동원샘물 가을 캠페인의 견적서를 발송했습니다.",
                          createdAt: "2022-11-03 00:00",
                        },
                        {
                          body: "임희정 담당자가 먹방 크리에이터 믹스의 견적서를 확인했습니다.",
                          createdAt: "2022-11-03 00:00",
                        },
                        {
                          body: "먹방 크리에이터 믹스 - 히밥의 상태가 '촬영 완료'로 변경되었습니다.",
                          createdAt: "2022-11-03 00:00",
                        },
                        {
                          body: "트레저현터 믹스건의 계약서가 업로드되어 담당자 검토를 기다리고 있습니다.",
                          createdAt: "2022-11-03 00:00",
                        },
                      ]
                    : [
                        {
                          body: "먹방 크리에이터 믹스, 3/5 완료",
                          createdAt: "2022-11-03 00:00",
                        },
                        {
                          body: "트레져헌터 믹스, 계약 진행중.",
                          createdAt: "2022-11-03 00:00",
                        },
                        {
                          body: "제로음료 대전, 2022-11-03 완료.",
                          createdAt: "2022-11-03 00:00",
                        },
                      ]
                  ).map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {item.body}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          lineHeight: "16px",
                          color: blueGrey[700],
                        }}
                      >
                        {item.createdAt}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CampaignRightTabItem>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

export const totalChartData = {
  datasets: [
    {
      // type: "pie" as const,
      label: "Dataset 1",
      data: [150, 20],
      backgroundColor: [blueGrey[800], blueGrey[50]],
      borderWidth: 0,
      spacing: 0,
    },
  ],
};
export const totalChartOptions = {
  cutout: 50,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          color: blueGrey[700],
          family: "Pretendard",
          weight: "700",
        },
      },
    },
  },
  maintainAspectRatio: false,
};
export const trendChartData = {
  labels: ["6/2", "6/9", "6/16", "6/23", "6/30", "7/6", "7/13", "7/20"],
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      data: [0.3, 40.5, 58.1, 90.8, 112.2, 140.3, 168.2, 300],
      pointRadius: 6,
      pointBorderWidth: 6,
      borderWidth: 8,
      backgroundColor: blueGrey[50],
      borderColor: blueGrey[800],
      curve: 3,
    },
    {
      type: "line" as const,
      label: "Dataset 2",
      data: [160, 100, 40, 84, 36, 64, 250, 150],
      pointRadius: 6,
      pointBorderWidth: 6,
      borderWidth: 8,
      backgroundColor: blueGrey[50],
      borderColor: green[500],
      curve: 3,
    },
  ],
};
export const trendChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        display: false,
        font: {
          size: 10,
          family: "Pretendard",
          weight: "700",
        },
        color: blueGrey[700],
      },
      grid: {
        // display: false,
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 10,
          family: "Pretendard",
          weight: "700",
        },
        color: blueGrey[700],
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  maintainAspectRatio: false,
};
export const keywordChartData = {
  labels: ["6/2", "6/9", "6/16", "6/23", "6/30", "7/6", "7/13", "7/20"],
  datasets: [
    {
      type: "bar" as const,
      label: "Dataset 1",
      data: [4, 40.5, 58.1, 90.8, 112.2, 140.3, 168.2, 300],
      borderWidth: 0,
      // backgroundColor: blueGrey[50],
      backgroundColor: blueGrey[800],
      pointBorderWidth: 0,
      barThickness: 12,
      borderRadius: 24,
      curve: 3,
    },
    {
      type: "bar" as const,
      label: "Dataset 2",
      data: [160, 100, 40, 84, 36, 64, 250, 150],
      borderWidth: 0,
      // backgroundColor: blueGrey[50],
      backgroundColor: pink[500],
      pointBorderWidth: 0,
      barThickness: 12,
      borderRadius: 24,
      curve: 3,
    },
  ],
};
export const keywordChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        display: false,
        font: {
          size: 10,
          family: "Pretendard",
          weight: "700",
        },
        color: blueGrey[700],
      },
      grid: {
        // display: false,
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 10,
          family: "Pretendard",
          weight: "700",
        },
        color: blueGrey[700],
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  maintainAspectRatio: false,
};
export const sexChartData = {
  labels: ["남성", "여성"],
  datasets: [
    {
      // type: "pie" as const,
      label: "Dataset 1",
      data: [150, 200],
      backgroundColor: [indigo[500], pink[500]],
      borderWidth: 0,
      spacing: 0,
    },
  ],
};
export const sexChartOptions = {
  cutout: 50,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          color: blueGrey[700],
          family: "Pretendard",
          weight: "700",
        },
      },
    },
  },
  maintainAspectRatio: false,
};
export const ageChartData = {
  labels: ageFilter.flatMap((el) => el.title),
  datasets: [
    {
      type: "bar" as const,
      label: "Dataset 1",
      data: [12, 25, 32, 4],
      barThickness: 12,
      borderWidth: 0,
      borderRadius: 24,
      // backgroundColor: blueGrey[50],
      backgroundColor: blueGrey[800],
      pointBorderWidth: 0,
      curve: 3,
    },
  ],
};
export const ageChartOptions = {
  indexAxis: "y" as const,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        font: {
          size: 10,
          family: "Pretendard",
          weight: "700",
        },
        color: blueGrey[700],
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        display: false,
        font: {
          size: 10,
          family: "Pretendard",
          weight: "700",
        },
        color: blueGrey[700],
      },
      grid: {
        // display: false,
        drawBorder: false,
      },
    },
  },
  maintainAspectRatio: false,
};
export const issueChartData = {
  datasets: [
    {
      // type: "pie" as const,
      label: "Dataset 1",
      data: [24, 86],
      backgroundColor: [blueGrey[800], blueGrey[50]],
      borderWidth: 0,
      spacing: 0,
    },
  ],
};
export const issueChartOptions = {
  cutout: 50,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          color: blueGrey[700],
          family: "Pretendard",
          weight: "700",
        },
      },
    },
  },
  maintainAspectRatio: false,
};
