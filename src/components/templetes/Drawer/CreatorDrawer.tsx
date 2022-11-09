import {
  Box,
  Button,
  ButtonBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  checkedCreatorIdsState,
  testCreators,
  testPlaylists,
} from "../../../datas";
import {
  alertDialogState,
  creatorDrawerState,
  creatorPopupState,
  estimateDrawerDefaultProps,
  estimateDrawerState,
  estimateInputDefaultProps,
} from "../../../recoil";
import { theme } from "../../../themes/theme";
import Icon from "../../atoms/Icon";
import PaperHeader from "../../molecules/PaperHeader";
import CreatorItem from "../../organisms/CreatorItem";

export default function CreatorDrawer() {
  const router = useRouter();
  const [creatorDrawer, setCreatorDrawer] = useRecoilState(creatorDrawerState);
  const [checkedCreatorIds, setCheckedCreatorIds] = useRecoilState(
    checkedCreatorIdsState
  );
  const { queryName, open, selectedCreatorIds, pass } = creatorDrawer;
  const creators = testCreators;
  const plans = testPlaylists;
  const setCreatorPopup = useSetRecoilState(creatorPopupState);
  const [estimateDrawer, setEstimateDrawer] =
    useRecoilState(estimateDrawerState);
  const setAlertDialog = useSetRecoilState(alertDialogState);
  const confirmable = pass || selectedCreatorIds.length > 0;
  useEffect(() => {
    handleClose();
  }, [router]);
  useEffect(() => {
    if (open) {
      if (!pass && selectedCreatorIds.length === 0) {
        setEstimateDrawer((prev) => {
          return {
            ...prev,
            open: false,
          };
        });
      }
    } else {
      setEstimateDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
    }
  }, [open, pass, selectedCreatorIds]);
  const handleClose = () => {
    setCreatorDrawer((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleClickNew = () => {
    setCreatorPopup((prev) => {
      return {
        ...prev,
        open: true,
      };
    });
  };
  const handleClickCheck = () => {
    setCreatorDrawer((prev) => {
      return {
        ...prev,
        // selectedCreatorIds: !prev.pass ? [] : prev.selectedCreatorIds,
        pass: !prev.pass,
      };
    });
  };
  const handleClickConfirm = () => {
    if (!estimateDrawer.open) {
      if (estimateDrawer.mix === undefined) {
        setAlertDialog((prev) => {
          return {
            ...prev,
            open: true,
            title: "크리에이터 추천",
            body: "선택하신 크리에이터 이외에 크리에이터 추천이 필요하신가요? 추천받기를 클릭하시면 유하가 더 많은 크리에이터를 포함해서 제안서를 드려요.",
            lottie: "/lotties/112689-3d-family-intro.json",
            cancel: {
              title: "괜찮아요",
              onClick: () => {
                setEstimateDrawer((prev) => {
                  return {
                    ...estimateDrawerDefaultProps,
                    open: true,
                    input: estimateInputDefaultProps,
                    mix: false,
                  };
                });
              },
            },
            confirm: {
              title: "추천받기",
              onClick: () => {
                setEstimateDrawer((prev) => {
                  return {
                    ...estimateDrawerDefaultProps,
                    open: true,
                    input: estimateInputDefaultProps,
                    mix: true,
                  };
                });
              },
            },
          };
        });
      } else {
        setEstimateDrawer((prev) => {
          return {
            ...prev,
            open: true,
          };
        });
      }
    } else {
      setEstimateDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
    }
  };
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 24,
          bottom: 24,
          left: open ? (376 + 16) * 2 + 24 : 24,
          zIndex: 99997,
          width: 376,
          transition: `left 0.35s ease, opacity 0.35s ease`,
          opacity: open ? 1 : 0,
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
              overflow: "auto",
            }}
            className={`PaperTarget-${queryName}`}
          >
            <PaperHeader
              queryName={queryName}
              title="크리에이터 선택"
              onClose={handleClose}
            />
            <Stack
              spacing={1}
              sx={{
                p: theme.spacing(0, 3, 20, 3),
                opacity: pass ? 0.4 : 1,
                transition: `all 0.35s ease`,
              }}
            >
              {_.filter(
                creators,
                (creatorsEl) =>
                  _.findIndex(
                    checkedCreatorIds,
                    (el) => el === creatorsEl.id
                  ) !== -1
              ).map((item, index) => (
                <CreatorItem key={index} item={item} checkMode />
              ))}
              <ButtonBase
                sx={{
                  width: "100%",
                  border: `1px dashed ${blueGrey[200]}`,
                  p: 2,
                  borderRadius: 1,
                  flexDirection: "column",
                  height: 114,
                  " *": {
                    textAlign: "center",
                  },
                  boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
                }}
                onClick={handleClickNew}
              >
                <Icon
                  prefix="fas"
                  name="plus"
                  size={20}
                  color={blueGrey[300]}
                />
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 14,
                    lineHeight: "20px",
                    fontWeight: "700",
                    color: blueGrey[300],
                  }}
                >
                  크리에이터 추가하기
                </Typography>
              </ButtonBase>
            </Stack>
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
            <ButtonBase
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                p: 1,
                borderRadius: 1,
              }}
              onClick={handleClickCheck}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: `${
                    pass ? blueGrey[900] : "#ffffff"
                  } !important`,
                  border: `1px solid ${pass ? blueGrey[900] : blueGrey[100]}`,
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
                  color={pass ? "#ffffff" : blueGrey[300]}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: blueGrey[500],
                }}
              >
                크리에이터를 선택하지 않고 견적을 받겠습니다.
              </Typography>
            </ButtonBase>
            <Box sx={{ p: theme.spacing(0, 1, 1, 1) }}>
              <Button
                color="secondary"
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
                  name="pen"
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
                  상세정보 입력하기
                </Typography>
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
