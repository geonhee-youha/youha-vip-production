import { Box, ButtonBase, Paper, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { checkedCreatorIdsState, testCampaignsState } from "../../../datas";
import {
  alertDialogState,
  campaignDrawerState,
  campaignPopupState,
  creatorDrawerState,
  estimateDrawerState,
} from "../../../recoil";
import { theme } from "../../../themes/theme";
import Icon from "../../atoms/Icon";
import PaperHeader from "../../molecules/PaperHeader";
import CampaignItem from "../../organisms/CampaignItem";

export default function CampaignDrawer() {
  const router = useRouter();
  const testCampaigns = useRecoilValue(testCampaignsState);
  const [campaignDrawer, setCampaignDrawer] =
    useRecoilState(campaignDrawerState);
  const setCreatorDrawer = useSetRecoilState(creatorDrawerState);
  const setEstimateDrawer = useSetRecoilState(estimateDrawerState);
  const setCheckedCreatorIds = useSetRecoilState(checkedCreatorIdsState);
  const setAlertDialog = useSetRecoilState(alertDialogState);
  const setCampaignPopup = useSetRecoilState(campaignPopupState);
  const {queryName, open, selectedCampaignIds } = campaignDrawer;
  useEffect(() => {
    handleClose();
  }, [router]);
  useEffect(() => {
    if (open) {
      if (selectedCampaignIds.length > 0) {
        setCreatorDrawer((prev) => {
          return {
            ...prev,
            open: true,
          };
        });
      }
    } else {
      setCreatorDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
      setEstimateDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
    }
  }, [open, selectedCampaignIds]);
  const handleClose = () => {
    setCampaignDrawer((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleClickClose = () => {
    if (open === true && selectedCampaignIds.length > 0) {
      setAlertDialog((prev) => {
        return {
          ...prev,
          open: true,
          title: "잠깐, 창을 닫기 전에...",
          body: "현재 진행내용을 저장하시겠습니까? 저장하기를 선택하시면 현재 상태가 저장됩니다.",
          lottie: undefined,
          cancel: {
            title: "삭제하기",
            onClick: () => {
              setCampaignDrawer((prev) => {
                return {
                  open: false,
                  selectedCampaignIds: [],
                };
              });
              setCreatorDrawer((prev) => {
                return {
                  // open: false,
                  ...prev,
                  selectedCreatorIds: [],
                  selectedPlanIds: [],
                  pass: false,
                };
              });
              setEstimateDrawer((prev) => {
                return {
                  // open: false,
                  ...prev,
                  mix: undefined,
                };
              });
              setCheckedCreatorIds([]);
            },
          },
          confirm: {
            title: "저장하기",
            onClick: () => {
              setCampaignDrawer((prev) => {
                return {
                  ...prev,
                  open: false,
                };
              });
            },
          },
        };
      });
    } else {
      setCampaignDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
    }
  };
  const handleClickNew = () => {
    setCampaignPopup((prev) => {
      return {
        ...prev,
        open: true,
        mode: "add",
      };
    });
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: 24,
        bottom: 24,
        left: open ? 376 + 16 + 24 : 24,
        zIndex: 99998,
        width: 376,
        transition: `all 0.35s ease`,
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
            title="캠페인 선택"
            onClose={handleClickClose}
          />
          <Stack spacing={1} sx={{ p: theme.spacing(0, 3, 2, 3) }}>
            {testCampaigns.map((item, index) => {
              return <CampaignItem key={index} item={item} checkMode />;
            })}
            <ButtonBase
              sx={{
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
              <Icon prefix="fas" name="plus" size={20} color={blueGrey[300]} />
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: "700",
                  color: blueGrey[300],
                }}
              >
                신규 캠페인 등록하기
              </Typography>
            </ButtonBase>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
