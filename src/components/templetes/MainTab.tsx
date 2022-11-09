import _ from "lodash";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey, pink } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pages } from "../../constants";
import { checkedCreatorIdsState, checkedPlaylistIdsState, testNotices, testUser } from "../../datas";
import {
  alarmDrawerState,
  alertDialogState,
  campaignDrawerState,
  creatorDrawerState,
  estimateDrawerDefaultProps,
  estimateDrawerState,
  searchDrawerState,
} from "../../recoil";
import { theme } from "../../themes/theme";
import youhaBlue from "../../themes/youhaBlue";
import Icon from "../atoms/Icon";
import MainTabItem from "../organisms/MainTabItem";
import NoticeItem from "../organisms/NoticeItem";
import UserItem from "../organisms/UserItem";

export default function MainTab() {
  const queryName = "MainTab";
  const router = useRouter();
  const [searchDrawer, setSearchDrawer] = useRecoilState(searchDrawerState);
  const [alarmDrawer, setAlarmDrawer] = useRecoilState(alarmDrawerState);
  const [campaignDrawer, setCampaignDrawer] =
    useRecoilState(campaignDrawerState);
  const [creatorDrawer, setCreatorDrawer] = useRecoilState(creatorDrawerState);
  const [estimateDrawer, setEstimateDrawer] =
    useRecoilState(estimateDrawerState);
  const setAlertDialog = useSetRecoilState(alertDialogState);
  const setCheckedCreatorIds = useSetRecoilState(checkedCreatorIdsState);
  const setCheckedPlaylistIds = useSetRecoilState(checkedPlaylistIdsState);
  const handleClickLogo = () => {
    router.push("/campaign");
  };
  const handleClickAlarm = () => {
    setAlarmDrawer((prev) => {
      return {
        ...prev,
        open: !prev.open,
      };
    });
    setSearchDrawer((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
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
  };
  const handleClickEstimate = () => {
    if (campaignDrawer.selectedCampaignIds.length > 0) {
      if (campaignDrawer.open === true) {
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
      } else {
        setAlertDialog((prev) => {
          return {
            ...prev,
            open: true,
            title: "진행중인 견적이 있습니다!",
            body: "저장된 진행내용을 이어하시겠습니까? 새로하기를 누르시면 기존 진행내용은 삭제됩니다.",
            lottie: undefined,
            cancel: {
              title: "새로하기",
              onClick: () => {
                setCampaignDrawer((prev) => {
                  return {
                    open: true,
                    selectedCampaignIds: [],
                  };
                });
                setCheckedCreatorIds([]);
                setCheckedPlaylistIds([]);
              },
            },
            confirm: {
              title: "이어하기",
              onClick: () => {
                setCampaignDrawer((prev) => {
                  return {
                    ...prev,
                    open: true,
                  };
                });
                if (estimateDrawer.mix !== undefined) {
                  setEstimateDrawer((prev) => {
                    return {
                      ...prev,
                      open: true,
                    };
                  });
                }
              },
            },
          };
        });
      }
    } else {
      setCampaignDrawer((prev) => {
        return {
          ...prev,
          open: !prev.open,
        };
      });
    }
    setSearchDrawer((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
    setAlarmDrawer((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleScroll = () => {
    var paperTargetEl: any = document.querySelector(`.PaperTarget-${name}`);
    var headerEl: any = document.querySelector(`.PaperHeader-${name}`);
    if (paperTargetEl.scrollTop > 0) {
      headerEl.style.boxShadow = `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`;
    } else {
      headerEl.style.boxShadow = ``;
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: 24,
        left: 24,
        bottom: 24,
        width: 376,
        zIndex: 99999,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 1,
          boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
          border: `1px solid ${blueGrey[100]}`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
          className={`PaperTarget-${queryName}`}
          // onScroll={handleScroll}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={-2}
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#ffffff",
              zIndex: 98,
              p: theme.spacing(1.5, 2, 1.5, 2),
              transition: `all 0.35s ease`,
            }}
            className={`PaperHeader-${queryName}`}
          >
            <Box
              sx={{
                p: theme.spacing(1),
                mr: "auto",
              }}
            >
              <img
                src="/images/logo/youha_logo-black.png"
                style={{
                  height: 24,
                  cursor: "pointer",
                }}
                onClick={handleClickLogo}
              />
            </Box>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                " *": {
                  cursor: "pointer !important",
                },
              }}
              onClick={handleClickAlarm}
            >
              <Icon
                name="bell"
                prefix="fas"
                size={20}
                color={alarmDrawer.open ? youhaBlue[500] : blueGrey[300]}
                badgeCount={3}
              />
            </IconButton>
          </Stack>
          <Stack
            spacing={2}
            sx={{
              p: theme.spacing(0, 3, 2, 3),
            }}
            className={`MainTabScrollTarget`}
          >
            <Box
              sx={{
                borderRadius: 1,
                backgroundColor: blueGrey[50],
                p: 1,
              }}
            >
              <UserItem item={testUser} />
            </Box>
            <Button
              fullWidth
              sx={{
                minHeight: 48,
                height: 48,
                boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
              }}
              onClick={handleClickEstimate}
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
                광고 집행하기
              </Typography>
              {campaignDrawer.open === false &&
                campaignDrawer.selectedCampaignIds.length > 0 && (
                  <Box
                    sx={{
                      borderRadius: 0.5,
                      ml: 1,
                      height: 24,
                      p: theme.spacing(0, 1),
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: pink[500],
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        color: "#ffffff",
                      }}
                    >
                      저장됨
                    </Typography>
                  </Box>
                )}
            </Button>
          </Stack>
          <Stack
            sx={{
              flex: 1,
              p: theme.spacing(2, 2, 0, 2),
            }}
          >
            {_.filter(pages, (el) => el.inMainTab === true).map(
              (item, index) => (
                <MainTabItem
                  key={index}
                  item={item}
                  handleClickEstimate={handleClickEstimate}
                />
              )
            )}
          </Stack>
          <Stack
            sx={{
              p: theme.spacing(0, 2, 2, 2),
            }}
          >
            {_.filter(pages, (el) => el.pathName === "/notice").map(
              (item, index) => (
                <MainTabItem key={index} item={item} right />
              )
            )}
            <Box
              sx={{
                p: theme.spacing(1, 1, 1, 1),
              }}
            >
              <Box
                sx={{
                  p: theme.spacing(1),
                  backgroundColor: blueGrey[50],
                  borderRadius: 1,
                }}
              >
                {testNotices.map((item, index) => (
                  <NoticeItem key={index} item={item} inMainTab />
                ))}
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: 10,
                lineHeight: "14px",
                color: blueGrey[500],
                textAlign: "center",
                p: 1,
              }}
            >
              ⓒ Ticketplace Inc.
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
