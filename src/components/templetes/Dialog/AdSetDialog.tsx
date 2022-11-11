import {
  alpha,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey, cyan, pink } from "@mui/material/colors";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import SwipeableViews from "react-swipeable-views";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { adSetDialogTabs } from "../../../constants";
import {
  testAdSets,
  checkedPlaylistIdsState,
  testPlaylists,
  testVideos,
  testAds,
  testCreators,
  testCampaignsState,
  testEstimates,
} from "../../../datas";
import {
  ageChartData,
  ageChartOptions,
  issueChartData,
  issueChartOptions,
  keywordChartData,
  keywordChartOptions,
  sexChartData,
  sexChartOptions,
  totalChartData,
  totalChartOptions,
  trendChartData,
  trendChartOptions,
} from "../../../pages/campaign";
import { adSetDialogState } from "../../../recoil";
import { theme } from "../../../themes/theme";
import youhaBlue from "../../../themes/youhaBlue";
import { setKoNumber } from "../../../utils";
import Icon from "../../atoms/Icon";
import Slide from "../../atoms/Slide";
import TextInput from "../../atoms/TextInput";
import Typo from "../../atoms/Typo";
import AdBoard from "../../molecules/AdBoard";
import PaperHeader from "../../molecules/PaperHeader";
import SideBar from "../../molecules/SideBar";
import AdItem from "../../organisms/AdItem";
import AdSetItem from "../../organisms/AdSetItem";
import CampaignItem from "../../organisms/CampaignItem";
import CreatorItem from "../../organisms/CreatorItem";
import { InputRow, Page } from "./EstimateConfirmDialog";
export default function AdSetDialog() {
  const [adSetDialog, setAdSetDialog] = useRecoilState(adSetDialogState);
  const { queryName, open, id: adSetId, index } = adSetDialog;
  return adSetId ? <Pager /> : null;
}
function Pager() {
  const [adSetDialog, setAdSetDialog] = useRecoilState(adSetDialogState);
  const { queryName, open, id: adSetId, index } = adSetDialog;
  const adSet =
    testAdSets[_.findIndex(testAdSets, (el: any) => el.id === adSetId)];
  const [tabIndex, setTabIndex] = useState<number>(0);
  const adThumbnailSize = 76;
  const { id, title, description, manager, status } = adSet;
  const ads = _.filter(testAds, (el) => el.set.id === id);
  const pre = status.value === "1";
  const completed = status.value === "3";
  const preAds = _.filter(
    ads,
    (el) => el.status.value === "0" || el.status.value === "1"
  );
  const proceeedingAds = _.filter(ads, (el) => el.status.value === "7");
  useEffect(() => {
    if (index !== undefined) setTabIndex(index);
  }, [index, open]);
  const handleClose = () => {
    setAdSetDialog((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const estimate = testEstimates[6];
  const checked = true;
  const disabled = true;
  const input = estimate.input;
  const mix = estimate.mix;
  const testCampaigns = useRecoilValue(testCampaignsState);
  const campaign =
    testCampaigns[
      _.findIndex(testCampaigns, (el) => el.id === estimate.campaignId)
    ];
  const creators = _.filter(testCreators, (el) =>
    estimate.creatorIds.includes(el.id)
  );
  const playlists = _.filter(testPlaylists, (el) =>
    estimate.playlistIds.includes(el.id)
  );
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="playlist-dialog-title"
      aria-describedby="playlist-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          position: "absolute",
          top: 24,
          left: `${(376 + 16) / 2 + 24}px`,
          "@media(min-width: 1600px)": {
            left: `calc((100vw - 1600px) / 2 + ${(376 + 16) / 2 + 24}px)`,
          },
          bottom: 24,
          width: (376 + 16) * 3 - 16 * 2,
          minWidth: (376 + 16) * 3 - 16 * 2,
          maxWidth: (376 + 16) * 3 - 16 * 2,
          maxHeight: `initial`,
          m: 0,
        },
        position: "fixed",
        zIndex: 999999,
        right: 0,
        overflow: "auto",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 1,
          boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
          className={`PaperTarget-${queryName}`}
        >
          <PaperHeader
            queryName={queryName}
            title={"광고세트 정보"}
            onClose={handleClose}
            borderBottom
          >
            <Stack
              direction="row"
              sx={{
                width: "100%",
                alignItems: "center",
                p: theme.spacing(2, 3, 4, 3),
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${ads.length > 1 ? 2 : 1}, 1fr)`,
                  gridAutoColumn: "1fr",
                  gridTemplateRows: "auto",
                  gridGap: 4,
                  width: adThumbnailSize * 2,
                  height:
                    ads.length > 2 ? adThumbnailSize * 2 : adThumbnailSize,
                }}
              >
                {ads.map((item, index) => {
                  const creator =
                    testCreators[
                      _.findIndex(
                        testCreators,
                        (el) => el.id === item.creator.id
                      )
                    ];
                  return (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        borderRadius: 1,
                        border: `1px solid ${blueGrey[100]} !important`,
                        backgroundColor: blueGrey[100],
                        overflow: "hidden",
                        boxShadow: `2px 2px 4px 0px ${alpha("#000000", 0.08)}`,
                      }}
                    >
                      <img
                        src={creator.thumbnail}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
              <Box
                sx={{
                  pl: 3,
                  pr: 3,
                  width: 280,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 0.5,
                      mr: 0.5,
                      height: 24,
                      p: theme.spacing(0, 1),
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: pre
                        ? cyan[50]
                        : completed
                        ? youhaBlue[50]
                        : pink[50],
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        // color: colors[adSet.id][500],
                        color: pre
                          ? cyan[500]
                          : completed
                          ? youhaBlue[500]
                          : pink[500],
                      }}
                    >
                      {pre ? "계약중" : completed ? "완료" : "진행중"}
                    </Typography>
                  </Box>
                </Box>
                <Typo
                  lines={10}
                  sx={{
                    fontSize: 20,
                    lineHeight: "32px",
                    fontWeight: "700",
                    color: blueGrey[900],
                  }}
                >
                  {title}
                </Typo>
                <Typo
                  lines={1}
                  sx={{
                    mt: 0.5,
                    fontSize: 14,
                    lineHeight: "20px",
                    color: blueGrey[700],
                  }}
                >
                  {description}
                </Typo>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: `1px solid ${blueGrey[100]} !important`,
                      backgroundColor: blueGrey[100],
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={manager.thumbnail}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      pl: 1,
                      flex: 1,
                    }}
                  >
                    <Typo
                      lines={1}
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        color: blueGrey[900],
                        wordBreak: "break-all",
                      }}
                    >
                      {manager.name} 매니저
                    </Typo>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  {
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mt: 1.5, width: 200 }}
                    >
                      <Typo
                        lines={1}
                        sx={{
                          fontSize: 12,
                          lineHeight: "16px",
                          fontWeight: "700",
                          color: pre
                            ? cyan[500]
                            : completed
                            ? youhaBlue[500]
                            : pink[500],
                          wordBreak: "break-all",
                        }}
                      >
                        {pre
                          ? ads.length - preAds.length
                          : completed
                          ? ads.length
                          : proceeedingAds.length}
                        /{ads.length}{" "}
                        {pre ? "계약중" : completed ? "완료" : "진행중"}
                      </Typo>
                      <Box
                        sx={{
                          flex: 1,
                          position: "relative",
                          height: 8,
                          borderRadius: 12,
                          backgroundColor: blueGrey[100],
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            backgroundColor: pre
                              ? cyan[500]
                              : completed
                              ? youhaBlue[500]
                              : pink[500],
                            borderRadius: 12,
                            width: `${
                              ((pre
                                ? ads.length - preAds.length
                                : completed
                                ? ads.length
                                : proceeedingAds.length) /
                                ads.length) *
                              100
                            }%`,
                          }}
                        />
                      </Box>
                    </Stack>
                  }
                </Box>
              </Box>
              <Stack
                spacing={1}
                sx={{
                  flex: 1,
                  alignItems: "flex-end",
                  // opacity: !completed ? 0.3 : 1,
                }}
              >
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{
                    width: 200,
                    minHeight: 40,
                    height: 40,
                    boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
                  }}
                  disabled={!completed}
                >
                  <Icon
                    name="file"
                    size={16}
                    color="inherit"
                    prefix="fas"
                    sx={{
                      mr: 1,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: "700",
                      color: "inherit",
                    }}
                  >
                    성과 리포트 보기
                  </Typography>
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{
                    width: 200,
                    minHeight: 40,
                    height: 40,
                    boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
                  }}
                  disabled={!completed}
                >
                  <Icon
                    name="paperclip"
                    size={16}
                    color="inherit"
                    prefix="fas"
                    sx={{
                      mr: 1,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: "700",
                      color: "inherit",
                    }}
                  >
                    최종 계약서 다운로드
                  </Typography>
                </Button>
                {!completed && (
                  <Typography
                    sx={{
                      width: 200,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: blueGrey[500],
                      textAlign: "center",
                    }}
                  >
                    모든 단계 완료 후 활성화됩니다
                  </Typography>
                )}
              </Stack>
            </Stack>
          </PaperHeader>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              overflow: "hidden",
              width: "100%",
              position: "relative",
            }}
          >
            <SwipeableViews
              index={tabIndex}
              onChangeIndex={setTabIndex}
              style={{
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: "hidden",
                  display: "flex",
                  pl: 40 + (448 - 375) / 8,
                }}
              >
                <Page>
                  {campaign && (
                    <Box
                      sx={{
                        p: theme.spacing(2, 3, 2, 3),
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 18,
                          lineHeight: "28px",
                          fontWeight: "700",
                          mb: 1,
                        }}
                      >
                        선택한 캠페인
                      </Typography>
                      <Stack spacing={1}>
                        <CampaignItem item={campaign} />
                      </Stack>
                    </Box>
                  )}
                  {creators && (
                    <Box
                      sx={{
                        p: theme.spacing(2, 3, 2, 3),
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 18,
                          lineHeight: "28px",
                          fontWeight: "700",
                          mb: 1,
                        }}
                      >
                        선택한 크리에이터
                      </Typography>
                      <Stack spacing={1}>
                        {creators.length > 0 ? (
                          creators.map((item: any, index: number) => (
                            <CreatorItem key={index} item={item} forceCheck />
                          ))
                        ) : (
                          <Box
                            sx={{
                              borderRadius: 1,
                              border: `1px solid ${blueGrey[100]}`,
                              height: 374,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                lineHeight: "20px",
                                fontWeight: "700",
                                color: blueGrey[300],
                                textAlign: "center",
                              }}
                            >
                              선택한 크리에이터가
                              <br />
                              없습니다.
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </Box>
                  )}
                </Page>
                <Page>
                  <Box
                    sx={{
                      p: theme.spacing(2, 3, 1, 3),
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 18,
                        lineHeight: "28px",
                        fontWeight: "700",
                        mb: 1,
                      }}
                    >
                      견적 상세정보
                    </Typography>
                  </Box>
                  <Stack
                    spacing={3}
                    sx={{
                      p: theme.spacing(0, 3, 2, 3),
                    }}
                  >
                    <ButtonBase
                      disabled
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        borderRadius: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: `${
                            mix ? youhaBlue[500] : "#ffffff"
                          } !important`,
                          border: `1px solid ${
                            mix ? youhaBlue[500] : blueGrey[100]
                          }`,
                          boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
                          zIndex: 98,
                          borderRadius: 0.5,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mr: 1,
                        }}
                      >
                        <Icon
                          name="check"
                          prefix="fas"
                          size={12}
                          color={mix ? "#ffffff" : blueGrey[300]}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: blueGrey[500],
                        }}
                      >
                        유하의 크리에이터 추천을 받겠습니다.
                      </Typography>
                    </ButtonBase>
                    <InputRow
                      label="총 예산"
                      value={`${setKoNumber(Number(input.budget))}원`}
                      essential
                    />
                    <InputRow
                      label="광고 일정"
                      value={input.duration}
                      essential
                    />
                    <InputRow label="광고 목적" essential>
                      <Box sx={{ mb: -1 }}>
                        {input.purposies.map((item, index) => {
                          const checked = true;
                          return (
                            <Button
                              key={index}
                              variant="outlined"
                              color={checked ? "primary" : "secondary"}
                              sx={{
                                p: theme.spacing(0, 1.25),
                                height: 32,
                                minHeight: 32,
                                border: `1px solid ${
                                  checked ? youhaBlue[500] : blueGrey[100]
                                } !important`,
                                boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                                  checked ? `0.08` : `0.08`
                                })`,
                                borderRadius: 1,
                                mr: 1,
                                mb: 1,
                              }}
                              disabled
                            >
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  lineHeight: "20px",
                                  fontWeight: "700",
                                  color: checked
                                    ? youhaBlue[500]
                                    : blueGrey[300],
                                }}
                              >
                                {item.title}
                              </Typography>
                            </Button>
                          );
                        })}
                      </Box>
                    </InputRow>
                    <InputRow label="2차 콘텐츠 활용">
                      <Box sx={{ mb: -1 }}>
                        {input.medias.map((item, index) => {
                          const checked = true;
                          return (
                            <Button
                              key={index}
                              variant="outlined"
                              color={checked ? "primary" : "secondary"}
                              sx={{
                                p: theme.spacing(0, 1.25),
                                height: 32,
                                minHeight: 32,
                                border: `1px solid ${
                                  checked ? youhaBlue[500] : blueGrey[100]
                                } !important`,
                                boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                                  checked ? `0.08` : `0.08`
                                })`,
                                borderRadius: 1,
                                mr: 1,
                                mb: 1,
                              }}
                              disabled
                            >
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  lineHeight: "20px",
                                  fontWeight: "700",
                                  color: checked
                                    ? youhaBlue[500]
                                    : blueGrey[300],
                                }}
                              >
                                {item.title}
                              </Typography>
                            </Button>
                          );
                        })}
                      </Box>
                    </InputRow>
                    {mix && (
                      <>
                        <InputRow label="카테고리" essential>
                          <Box sx={{ mb: -1 }}>
                            {input.categories.map((item, index) => {
                              const checked = true;
                              return (
                                <Button
                                  key={index}
                                  variant="outlined"
                                  color={checked ? "primary" : "secondary"}
                                  sx={{
                                    p: theme.spacing(0, 1.25),
                                    height: 32,
                                    minHeight: 32,
                                    border: `1px solid ${
                                      checked ? youhaBlue[500] : blueGrey[100]
                                    } !important`,
                                    boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                                      checked ? `0.08` : `0.08`
                                    })`,
                                    borderRadius: 1,
                                    mr: 1,
                                    mb: 1,
                                  }}
                                  disabled
                                >
                                  <Typography
                                    sx={{
                                      fontSize: 14,
                                      lineHeight: "20px",
                                      fontWeight: "700",
                                      color: checked
                                        ? youhaBlue[500]
                                        : blueGrey[300],
                                    }}
                                  >
                                    {item.title}
                                  </Typography>
                                </Button>
                              );
                            })}
                          </Box>
                        </InputRow>
                        <InputRow label="타겟 성별" essential>
                          <Box sx={{ mb: -1 }}>
                            <Button
                              variant="outlined"
                              color={checked ? "primary" : "secondary"}
                              sx={{
                                p: theme.spacing(0, 1.25),
                                height: 32,
                                minHeight: 32,
                                border: `1px solid ${
                                  checked ? youhaBlue[500] : blueGrey[100]
                                } !important`,
                                boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                                  checked ? `0.08` : `0.08`
                                })`,
                                borderRadius: 1,
                                mr: 1,
                                mb: 1,
                              }}
                              disabled
                            >
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  lineHeight: "20px",
                                  fontWeight: "700",
                                  color: checked
                                    ? youhaBlue[500]
                                    : blueGrey[300],
                                }}
                              >
                                {input.sex?.title}
                              </Typography>
                            </Button>
                          </Box>
                        </InputRow>
                        <InputRow label="타겟 연령대" essential>
                          <Box sx={{ mb: -1 }}>
                            {input.ages.map((item, index) => {
                              const checked = true;
                              return (
                                <Button
                                  key={index}
                                  variant="outlined"
                                  color={checked ? "primary" : "secondary"}
                                  sx={{
                                    p: theme.spacing(0, 1.25),
                                    height: 32,
                                    minHeight: 32,
                                    border: `1px solid ${
                                      checked ? youhaBlue[500] : blueGrey[100]
                                    } !important`,
                                    boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                                      checked ? `0.08` : `0.08`
                                    })`,
                                    borderRadius: 1,
                                    mr: 1,
                                    mb: 1,
                                  }}
                                  disabled
                                >
                                  <Typography
                                    sx={{
                                      fontSize: 14,
                                      lineHeight: "20px",
                                      fontWeight: "700",
                                      color: checked
                                        ? youhaBlue[500]
                                        : blueGrey[300],
                                    }}
                                  >
                                    {item.title}
                                  </Typography>
                                </Button>
                              );
                            })}
                          </Box>
                        </InputRow>
                        <InputRow
                          label="희망 채널 갯수"
                          essential
                          value={input.channelCount}
                        />
                      </>
                    )}
                    <InputRow
                      label="핵심 키워드"
                      essential
                      value={input.keyword}
                    />
                    <InputRow
                      label="셀링 포인트"
                      value={input.sellingPoint}
                      minRows={3}
                    />
                    <InputRow
                      label="광고 기획의도 상세"
                      value={input.description}
                      minRows={3}
                    />
                    <InputRow
                      label="기타 요청사항"
                      value={input.request}
                      minRows={3}
                    />
                    <InputRow
                      label="첨부파일"
                      value={"유하용_제안서_최종.pdf"}
                    />
                  </Stack>
                </Page>
              </Box>
              <Slide
                sx={{
                  pl: 40 + (448 - 375) / 8,
                }}
              >
                <Box
                  sx={{
                    p: theme.spacing(2, 3, 1, 3),
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 18,
                      lineHeight: "28px",
                      fontWeight: "700",
                      mb: 1,
                    }}
                  >
                    광고 확정 진행현황
                  </Typography>
                  <Stack
                    sx={{
                      mt: 2,
                      borderRadius: 1,
                      border: `1px solid ${blueGrey[100]}`,
                      boxShadow: `2px 2px 4px 0px ${alpha("#000000", 0.08)}`,
                      overflow: "hidden",
                    }}
                  >
                    {ads.map((item, index) => (
                      <AdItem key={index} item={item} index={index} checklist />
                    ))}
                  </Stack>
                </Box>
              </Slide>
              <Slide
                sx={{
                  pl: 40 + (448 - 375) / 8,
                }}
              >
                <Box
                  sx={{
                    p: theme.spacing(2, 3, 1, 3),
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 18,
                      lineHeight: "28px",
                      fontWeight: "700",
                      mb: 1,
                    }}
                  >
                    계약서
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: theme.spacing(0, 3, 3, 3),
                  }}
                >
                  {/* <Typography
                    sx={{
                      mb: 1,
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: "700",
                      "& span": {
                        color: youhaBlue[500],
                      },
                    }}
                  >
                    첨부파일 (최대 30MB)
                  </Typography> */}
                  <Button
                    color="secondary"
                    variant="outlined"
                    // fullWidth
                    sx={{
                      width: 300,
                      minHeight: 40,
                      height: 40,
                      boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
                    }}
                  >
                    <Icon
                      name="download"
                      size={16}
                      color="inherit"
                      prefix="fas"
                      sx={{
                        mr: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                        fontWeight: "700",
                        color: "inherit",
                      }}
                    >
                      최종 계약서 다운로드
                    </Typography>
                  </Button>
                </Box>
              </Slide>
              <Slide>
                <Box
                  sx={{
                    p: theme.spacing(2, 3, 1, 3 + 40 + (448 - 375) / 8),
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 18,
                      lineHeight: "28px",
                      fontWeight: "700",
                      mb: 1,
                    }}
                  >
                    광고 집행 현황
                  </Typography>
                </Box>
                <AdBoard ads={ads} />
              </Slide>
              <Slide
                sx={{
                  pl: 40 + (448 - 375) / 8,
                }}
              >
                <Box sx={{
                  ml: -1,
                  mr: 1,
                }}>
                  <img src="/images/report-0.png" />
                  <img src="/images/report-1.png" />
                  <img src="/images/report-2.png" />
                  <img src="/images/report-3.png" />
                </Box>
              </Slide>
            </SwipeableViews>
            <SideBar
              color="secondary"
              title="adSetDialog"
              tabs={adSetDialogTabs}
              index={tabIndex}
              setIndex={setTabIndex}
              disables={pre ? [2, 3, 4, 5] : completed ? [] : [4, 5]}
              current={pre ? 1 : completed ? 4 : 3}
            />
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
}
