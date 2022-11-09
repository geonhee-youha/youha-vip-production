import { Backdrop } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { checkedCreatorIdsState, checkedPlaylistIdsState } from "../../datas";
import {
  alarmDrawerState,
  alertDialogState,
  campaignDrawerState,
  creatorDrawerState,
  estimateDrawerDefaultProps,
  estimateDrawerState,
  estimateInputDefaultProps,
  searchDrawerState,
} from "../../recoil";

export default function BackDrop() {
  const [searchDrawer, setSearchDrawer] = useRecoilState(searchDrawerState);
  const [alarmDrawer, setAlarmDrawer] = useRecoilState(alarmDrawerState);
  const [campaignDrawer, setCampaignDrawer] =
    useRecoilState(campaignDrawerState);
  const [creatorDrawer, setCreatorDrawer] = useRecoilState(creatorDrawerState);
  const [estimateDrawer, setEstimateDrawer] =
    useRecoilState(estimateDrawerState);
  const setCheckedCreatorIds = useSetRecoilState(checkedCreatorIdsState);
  const setCheckedPlaylistIds = useSetRecoilState(checkedPlaylistIdsState);
  const setAlertDialog = useSetRecoilState(alertDialogState);
  const handleClick = () => {
    if (searchDrawer.open) {
      setSearchDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
      return;
    }
    if (alarmDrawer.open) {
      setAlarmDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
      return;
    }
    if (estimateDrawer.open) {
      setEstimateDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
      return;
    }
    if (creatorDrawer.open) {
      setCreatorDrawer((prev) => {
        return {
          ...prev,
          open: false,
        };
      });
      return;
    }
    if (campaignDrawer.open) {
      if (campaignDrawer.selectedCampaignIds.length > 0) {
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
                    open: false,
                    selectedCreatorIds: [],
                    selectedPlanIds: [],
                    pass: false,
                  };
                });
                setEstimateDrawer((prev) => {
                  return {
                    ...estimateDrawerDefaultProps,
                    open: false,
                    input: estimateInputDefaultProps,
                    mix: undefined,
                  };
                });
                setCheckedCreatorIds([]);
                setCheckedPlaylistIds([]);
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
              },
            },
          };
        });
        return;
      } else {
        setCampaignDrawer((prev) => {
          return {
            ...prev,
            open: false,
          };
        });
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
        return;
      }
    }
  };
  return (
    <Backdrop
      open={
        searchDrawer.open ||
        alarmDrawer.open ||
        campaignDrawer.open ||
        creatorDrawer.open ||
        estimateDrawer.open
      }
      onClick={handleClick}
      sx={{
        zIndex: 9999,
      }}
    />
  );
}
