import {
  alpha,
  Box,
  Button,
  ButtonBase,
  Dialog,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  checkedCreatorIdsState,
  checkedPlaylistIdsState,
} from "../../../datas";
import {
  alertDialogState,
  campaignDrawerDefaultProps,
  campaignDrawerState,
  creatorDrawerDefaultProps,
  creatorDrawerState,
  estimateConfirmDialogDefaultProps,
  estimateConfirmDialogState,
  estimateDrawerDefaultProps,
  estimateDrawerState,
} from "../../../recoil";
import { theme } from "../../../themes/theme";
import youhaBlue from "../../../themes/youhaBlue";
import { setKoNumber } from "../../../utils";
import Icon from "../../atoms/Icon";
import PaperHeader from "../../molecules/PaperHeader";
import CampaignItem from "../../organisms/CampaignItem";
import CreatorItem from "../../organisms/CreatorItem";

export default function EstimateConfirmDialog() {
  const boxRef = useRef<any>(null);
  const [estimateConfirmDialog, setEstimateConfirmDialog] =
    useRecoilState(estimateConfirmDialogState);
  const setCheckedCreatorIds = useSetRecoilState(checkedCreatorIdsState);
  const setCheckedPlaylistIds = useSetRecoilState(checkedPlaylistIdsState);
  const setCampaignDrawer = useSetRecoilState(campaignDrawerState);
  const setCreatorDrawer = useSetRecoilState(creatorDrawerState);
  const setEstimateDrawer = useSetRecoilState(estimateDrawerState);
  const setAlertDialog = useSetRecoilState(alertDialogState);
  const {
    queryName,
    open,
    confirm,
    temp,
    campaign,
    creators,
    input,
    mix,
  } = estimateConfirmDialog;
  const handleClose = () => {
    setEstimateConfirmDialog((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleClickConfirm = () => {
    confirm?.onClick();
    // handleClose();
    setCheckedCreatorIds([]);
    setCheckedPlaylistIds([]);
    setEstimateConfirmDialog(estimateConfirmDialogDefaultProps);
    setCampaignDrawer(campaignDrawerDefaultProps);
    setCreatorDrawer(creatorDrawerDefaultProps);
    setEstimateDrawer(estimateDrawerDefaultProps);
    setAlertDialog((prev) => {
      return {
        ...prev,
        open: true,
        title: "광고 견적요청이 완료되었습니다.",
        body: "조금만 기다려 주세요, 24시간 내 유하에서 견적 결과를 알려드립니다!",
        lottie: "/lotties/71480-press-the-button.json",
        cancel: {
          ...prev.cancel,
          hide: true,
          onClick: () => {},
        },
        confirm: {
          ...prev.confirm,
          title: "네 알겠어요!",
          onClick: () => {},
        },
      };
    });
  };
  const checked = true;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="estimate-dialog-title"
      aria-describedby="estimate-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          width: 376 * 2 + 16,
          minWidth: 376 * 2 + 16,
          maxWidth: 376 * 2 + 16,
          height: `calc((100vh - ${24 * 2}px))`,
          maxHeight: `calc((100vh - ${24 * 2}px))`,
        },
        position: "fixed",
        zIndex: 999998,
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
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          className={`PaperTarget-${queryName}`}
        >
          <PaperHeader
            queryName={queryName}
            title={temp ? "견적서 미리보기" : "견적서 정보"}
            onClose={handleClose}
          />
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
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
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
                        creators.map((item, index) => (
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
                                color: checked ? youhaBlue[500] : blueGrey[300],
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
                                color: checked ? youhaBlue[500] : blueGrey[300],
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
                                color: checked ? youhaBlue[500] : blueGrey[300],
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
                  <InputRow label="핵심 키워드" essential value={input.keyword} />
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
                  <InputRow label="첨부파일" value={"유하용_제안서_최종.pdf"} />
                </Stack>
              </Page>
            </Box>
          </Box>
        </Box>
        <Stack
          spacing={1}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            p: theme.spacing(1, 2),
            zIndex: 98,
            backgroundColor: "#ffffff",
            boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
          }}
        >
          <Typography
            sx={{
              p: 1,
              fontSize: 14,
              lineHeight: "20px",
              textAlign: "center",
            }}
          >
            지금 견적을 신청하시면,
            <br />
            유하 팀에서 검수 후 최대 24시간 내 응답드립니다.
          </Typography>
          <Box sx={{ p: theme.spacing(0, 1, 1, 1) }}>
            <Button
              fullWidth
              sx={{
                minHeight: 48,
                height: 48,
                boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
              }}
              onClick={handleClickConfirm}
            >
              <Icon
                name="wand-magic-sparkles"
                size={20}
                color="#ffffff"
                prefix="fas"
                sx={{
                  mr: 1,
                }}
              />
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: "24px",
                  fontWeight: "700",
                  color: "#ffffff",
                }}
              >
                위 내용으로 견적 신청하기
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Dialog>
  );
}
export function InputRow({
  label,
  value,
  essential,
  children,
  minRows = 1,
}: {
  label: string;
  value?: any;
  essential?: boolean;
  children?: React.ReactNode;
  minRows?: number;
}) {
  return (
    <Box
      sx={{
        opacity: value || children ? 1 : 0.4,
      }}
    >
      <Typography
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
        {label}
        {essential && <span>*</span>}
      </Typography>
      {children ?? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 1,
            backgroundColor: alpha(blueGrey[50], 1),
            p: theme.spacing(1.5, 2),
          }}
        >
          <Typography
            sx={{
              minHeight: minRows * 24,
              fontSize: 16,
              lineHeight: "24px",
            }}
          >
            {value}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
export function Page({ children }: { children?: React.ReactNode }) {
  const boxRef = useRef<any>(null);
  const shadowRef = useRef<any>(null);
  const handleScroll = (e: any) => {
    if (boxRef.current.scrollTop > 0) {
      shadowRef.current.style.boxShadow = `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`;
    } else {
      shadowRef.current.style.boxShadow = ``;
    }
  };
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
      }}
    >
      <Box
        ref={shadowRef}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: -40,
          height: 40,
          backgroundColor: "#ffffff",
          transition: `all 0.35s ease`,
          zIndex: 9,
        }}
      />
      <Box
        ref={boxRef}
        sx={{
          position: "relative",
          height: "100%",
          overflow: "auto",
        }}
        onScroll={handleScroll}
      >
        <Box sx={{ pb: 20 }}>{children}</Box>
      </Box>
    </Box>
  );
}
