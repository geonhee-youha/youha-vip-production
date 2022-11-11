import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import _ from "lodash";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { testCampaignsState } from "../../../datas";
import { campaignDialogState, campaignPopupState } from "../../../recoil";
import { theme } from "../../../themes/theme";
import youhaBlue from "../../../themes/youhaBlue";
import Icon from "../../atoms/Icon";
import TextInput from "../../atoms/TextInput";
import PaperHeader from "../../molecules/PaperHeader";
import { Page } from "./EstimateConfirmDialog";

export default function CampaignDialog() {
  const titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const categoryRef = useRef<any>(null);
  const keywordRef = useRef<any>(null);
  const sexRef = useRef<any>(null);
  const ageRef = useRef<any>(null);
  const [testCampaigns, setTestCampaigns] = useRecoilState(testCampaignsState);
  const [campaignDialog, setCampaignDialog] =
    useRecoilState(campaignDialogState);
  const setCampaignPopup = useSetRecoilState(campaignPopupState);
  const { queryName, open, id } = campaignDialog;
  const campaign =
    testCampaigns[_.findIndex(testCampaigns, (el) => el.id === id)];
  const input = campaign;
  const handleClose = () => {
    setCampaignDialog((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleClickEdit = () => {
    setCampaignPopup((prev) => {
      return {
        ...prev,
        open: true,
        mode: "edit",
        id: id,
      };
    });
  };
  const checked = true;
  const disabled = true;
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
          left: `${376 + 16 + 24}px`,
          "@media(min-width: 1600px)": {
            left: `calc((100vw - 1600px) / 2 + ${376 + 16 + 24}px)`,
          },
          bottom: 24,
          width: (376 + 16) * 2,
          minWidth: (376 + 16) * 2,
          maxWidth: (376 + 16) * 2,
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
            title={"캠페인 정보"}
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
                    캠페인 상세정보
                  </Typography>
                </Box>
                {campaign && (
                  <Stack
                    spacing={3}
                    sx={{
                      p: theme.spacing(0, 3, 2 + 16, 3),
                    }}
                  >
                    <Button
                      color="secondary"
                      variant="outlined"
                      fullWidth
                      sx={{
                        minHeight: 40,
                        height: 40,
                        boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
                      }}
                      onClick={handleClickEdit}
                    >
                      <Icon
                        name="pen"
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
                        캠페인 정보 수정하기
                      </Typography>
                    </Button>
                    <TextInput
                      inputRef={titleRef}
                      label="캠페인 제목"
                      essential
                      value={input.title}
                      type="text"
                      disabled={disabled}
                    />
                    <TextInput
                      inputRef={descriptionRef}
                      label="캠페인 설명"
                      essential
                      value={input.description}
                      type="text"
                      multiline
                      minRows={3}
                      disabled={disabled}
                    />
                    <Box>
                      <Typography
                        sx={{
                          mb: 0.5,
                          fontSize: 14,
                          lineHeight: "20px",
                          fontWeight: "700",
                          "& span": {
                            color: youhaBlue[500],
                          },
                        }}
                      >
                        카테고리 (최소 1개)
                        <span>*</span>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          mt: 1,
                          mb: -1,
                        }}
                      >
                        {input.categories.map((item, index) => {
                          const checked = input.categories
                            .flatMap((el) => el.value)
                            .includes(item.value);
                          return (
                            <Button
                              key={index}
                              ref={index === 0 ? categoryRef : null}
                              variant="outlined"
                              color={checked ? "primary" : "secondary"}
                              sx={{
                                display:
                                  !checked && disabled ? "none" : "inline-flex",
                                p: theme.spacing(0, 1.25),
                                height: 32,
                                minHeight: 32,
                                border: `1px solid ${
                                  checked ? youhaBlue[500] : blueGrey[100]
                                } !important`,
                                boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                                  checked && disabled ? `0` : `0.08`
                                })`,
                                borderRadius: 1,
                                mr: 1,
                                mb: 1,
                              }}
                              disabled={disabled}
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
                    </Box>
                    <TextInput
                      inputRef={keywordRef}
                      label="핵심 키워드 (1개)"
                      essential
                      value={input.keyword}
                      type="text"
                      disabled={disabled}
                    />
                    <Box>
                      <Typography
                        sx={{
                          mb: 0.5,
                          fontSize: 14,
                          lineHeight: "20px",
                          fontWeight: "700",
                          "& span": {
                            color: youhaBlue[500],
                          },
                        }}
                      >
                        타겟 성별
                        <span>*</span>
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                        <Button
                          variant="outlined"
                          color={checked ? "primary" : "secondary"}
                          sx={{
                            display:
                              !checked && disabled ? "none" : "inline-flex",
                            p: theme.spacing(0, 1.25),
                            height: 32,
                            minHeight: 32,
                            border: `1px solid ${
                              checked ? youhaBlue[500] : blueGrey[100]
                            } !important`,
                            boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                              checked && disabled ? `0` : `0.08`
                            })`,
                            borderRadius: 1,
                          }}
                          disabled={disabled}
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
                      </Stack>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          mb: 0.5,
                          fontSize: 14,
                          lineHeight: "20px",
                          fontWeight: "700",
                          "& span": {
                            color: youhaBlue[500],
                          },
                        }}
                      >
                        타겟 연령대 (중복 가능)
                        <span>*</span>
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{
                          mt: 1,
                        }}
                      >
                        {input.ages.map((item, index) => {
                          const checked = input.ages
                            .flatMap((el) => el.value)
                            .includes(item.value);
                          return (
                            <Button
                              key={index}
                              ref={index === 0 ? ageRef : null}
                              variant="outlined"
                              color={checked ? "primary" : "secondary"}
                              sx={{
                                display:
                                  !checked && disabled ? "none" : "inline-flex",
                                p: theme.spacing(0, 1.25),
                                height: 32,
                                minHeight: 32,
                                border: `1px solid ${
                                  checked ? youhaBlue[500] : blueGrey[100]
                                } !important`,
                                boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                                  checked && disabled ? `0` : `0.08`
                                })`,
                                borderRadius: 1,
                              }}
                              disabled={disabled}
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
                      </Stack>
                    </Box>
                  </Stack>
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
                    관련 견적서
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 40,
                    left: 0,
                    right: 0,
                    bottom: 16,
                    backgroundColor: "#ffffff",
                    zIndex: 99,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1,
                    overflow: "hidden",
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
                    아직 이 캠페인으로
                    <br />
                    진행한 견적이 없습니다!
                  </Typography>
                </Box>
              </Page>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
}
