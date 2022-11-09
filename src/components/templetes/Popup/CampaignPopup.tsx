import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import _ from "lodash";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ageFilter, sexFilter, categoryFilter } from "../../../constants";
import {
  campaignDefaultProps,
  CampaignProps,
  testCampaignsState,
} from "../../../datas";
import { campaignPopupState } from "../../../recoil";
import { theme } from "../../../themes/theme";
import youhaBlue from "../../../themes/youhaBlue";
import Icon from "../../atoms/Icon";
import TextInput from "../../atoms/TextInput";
import PaperHeader from "../../molecules/PaperHeader";

export default function CampaignPopup() {
  const titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const categoryRef = useRef<any>(null);
  const keywordRef = useRef<any>(null);
  const sexRef = useRef<any>(null);
  const ageRef = useRef<any>(null);
  const [testCampaigns, setTestCampaigns] = useRecoilState(testCampaignsState);
  const [campaignPopup, setCampaignPopup] = useRecoilState(campaignPopupState);
  const { queryName, open, mode, id } = campaignPopup;
  const [input, setInput] = useState<CampaignProps>(campaignDefaultProps);
  const confirmable =
    input.title !== "" &&
    input.description !== "" &&
    input.categories.length > 0 &&
    input.keyword !== "" &&
    input.sex?.value !== undefined &&
    input.ages.length > 0;
  const title = mode === "add" ? "신규 캠페인 등록" : "캠페인 수정";
  const buttonTitle =
    mode === "add" ? "위 내용으로 등록하기" : "위 내용으로 수정하기";
  const disabled = mode === undefined;
  useEffect(() => {
    if (open && mode !== "add" && id !== undefined && input.id === 0)
      setInput(testCampaigns[_.findIndex(testCampaigns, (el) => el.id === id)]);
    if (!open) setInput(campaignDefaultProps);
  }, [open]);
  const handleClose = () => {
    setCampaignPopup((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput((prev) => {
      return {
        ...prev,
        title: value,
      };
    });
  };
  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };
  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput((prev) => {
      return {
        ...prev,
        keyword: value,
      };
    });
  };
  const handleResetTitle = () => {
    setInput((prev) => {
      return {
        ...prev,
        title: "",
      };
    });
  };
  const handleResetKeyword = () => {
    setInput((prev) => {
      return {
        ...prev,
        keyword: "",
      };
    });
  };
  const handleKeyPressTitle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      titleRef.current.blur();
      descriptionRef.current.focus();
    }
  };
  const handleKeyPressKeyword = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      keywordRef.current.blur();
      sexRef.current.focus();
    }
  };
  const handleKeyPressDescription = () => {};
  const handleClickConfirm = () => {
    if (mode === "edit") {
      handleClose();
      setTestCampaigns((prev) => {
        let prevList = _.cloneDeep(prev);
        prevList[_.findIndex(prevList, (el) => el.id === id)] = {
          ...input,
          createdAt: new Date(),
        };
        return prevList;
      });
    } else {
      handleClose();
      setTestCampaigns((prev) => {
        return [
          ...prev,
          {
            ...input,
            id: prev.length + 1,
          },
        ];
      });
    }
  };
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
          width: 376 + 16,
          minWidth: 376 + 16,
          maxWidth: 376 + 16,
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
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: 1,
          boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
          className={`PaperTarget-${queryName}`}
        >
          <PaperHeader
            queryName={queryName}
            title={title}
            onClose={handleClose}
          />
          <Stack
            spacing={3}
            sx={{
              p: theme.spacing(0, 3, 2 + 16, 3),
            }}
          >
            <TextInput
              inputRef={titleRef}
              onKeyPress={handleKeyPressTitle}
              label="캠페인 제목"
              essential
              value={input.title}
              onChange={handleChangeTitle}
              onReset={handleResetTitle}
              type="text"
              disabled={disabled}
            />
            <TextInput
              inputRef={descriptionRef}
              onKeyPress={handleKeyPressDescription}
              label="캠페인 설명"
              essential
              value={input.description}
              onChange={handleChangeDescription}
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
                {categoryFilter.map((item, index) => {
                  const checked = input.categories
                    .flatMap((el) => el.value)
                    .includes(item.value);
                  const handleClick = () => {
                    if (disabled) return;
                    setInput((prev) => {
                      let prevList = _.cloneDeep(prev.categories);
                      if (
                        prevList.flatMap((el) => el.value).includes(item.value)
                      ) {
                        prevList = _.filter(
                          prevList,
                          (el) => el.value !== item.value
                        );
                      } else {
                        prevList = [...prevList, item];
                      }
                      return { ...prev, categories: prevList };
                    });
                  };
                  return (
                    <Button
                      key={index}
                      ref={index === 0 ? categoryRef : null}
                      variant="outlined"
                      color={checked ? "primary" : "secondary"}
                      sx={{
                        display: !checked && disabled ? "none" : "inline-flex",
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
                      onClick={handleClick}
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
            </Box>
            <TextInput
              inputRef={keywordRef}
              onKeyPress={handleKeyPressKeyword}
              label="핵심 키워드 (1개)"
              value={input.keyword}
              onChange={handleChangeKeyword}
              onReset={handleResetKeyword}
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
                {sexFilter.map((item, index) => {
                  const checked = input.sex?.value === item.value;
                  const handleClick = () => {
                    if (disabled) return;
                    setInput((prev) => {
                      return {
                        ...prev,
                        sex: prev.sex?.value === item.value ? undefined : item,
                      };
                    });
                  };
                  return (
                    <Button
                      key={index}
                      ref={index === 0 ? sexRef : null}
                      variant="outlined"
                      color={checked ? "primary" : "secondary"}
                      sx={{
                        display: !checked && disabled ? "none" : "inline-flex",
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
                      onClick={handleClick}
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
                {ageFilter.map((item, index) => {
                  const checked = input.ages
                    .flatMap((el) => el.value)
                    .includes(item.value);
                  const handleClick = () => {
                    if (disabled) return;
                    setInput((prev) => {
                      let prevList = _.cloneDeep(prev.ages);
                      if (
                        prevList.flatMap((el) => el.value).includes(item.value)
                      ) {
                        prevList = _.filter(
                          prevList,
                          (el) => el.value !== item.value
                        );
                      } else {
                        prevList = [...prevList, item];
                      }
                      return {
                        ...prev,
                        ages: prevList,
                      };
                    });
                  };
                  return (
                    <Button
                      key={index}
                      ref={index === 0 ? ageRef : null}
                      variant="outlined"
                      color={checked ? "primary" : "secondary"}
                      sx={{
                        display: !checked && disabled ? "none" : "inline-flex",
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
                      onClick={handleClick}
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
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            p: theme.spacing(2, 3),
            zIndex: 98,
            backgroundColor: "#ffffff",
            boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
          }}
        >
          <Button
            color={mode !== undefined ? "primary" : "secondary"}
            fullWidth
            sx={{
              minHeight: 48,
              height: 48,
              boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
            }}
            disabled={!confirmable}
            onClick={handleClickConfirm}
          >
            <Icon
              name={mode === "add" ? "layer-plus" : "pen"}
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
              {buttonTitle}
            </Typography>
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}
