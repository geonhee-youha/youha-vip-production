import {
  Box,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey, pink } from "@mui/material/colors";
import _ from "lodash";
import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  creatorDialogTabs,
  playlistFilters,
  playlistSorts,
  videoFilters,
  videoSorts,
} from "../../../constants";
import {
  favoritedCreatorIdsState,
  testCreators,
  testPlaylists,
  testVideos,
} from "../../../datas";
import { creatorDialogState } from "../../../recoil";
import { theme } from "../../../themes/theme";
import youhaBlue from "../../../themes/youhaBlue";
import { setKoNumber } from "../../../utils";
import DataCell from "../../atoms/DataCell";
import Icon from "../../atoms/Icon";
import Typo from "../../atoms/Typo";
import PaperHeader from "../../molecules/PaperHeader";
import PlaylistItem from "../../organisms/PlaylistItem";
import TabBar from "../../molecules/TabBar";
import { Chart } from "react-chartjs-2";
import VideoItem from "../../organisms/VideoItem";
import Slide from "../../atoms/Slide";
import List from "../../atoms/List";

export default function CreatorDialog() {
  const [creatorDialog, setCreatorDialog] = useRecoilState(creatorDialogState);
  const [favoritedCreatorIds, setFavoritedCreatorIds] = useRecoilState(
    favoritedCreatorIdsState
  );
  const { queryName, open, id, index, checkMode, forceCheck } = creatorDialog;
  const creator =
    _.findIndex(testCreators, (el) => el.id === id) !== -1
      ? testCreators[_.findIndex(testCreators, (el) => el.id === id)]
      : null;
  const playlists = creator
    ? _.filter(
        testPlaylists.flatMap((el) => el.playlistItems),
        (el: any) => el.snippet.channelTitle === creator.title
      )
    : [];
  const videos = testVideos;
  const favorited = favoritedCreatorIds.includes(id);
  const [tabIndex, setTabIndex] = useState<number>(0);
  useEffect(() => {
    if (index !== undefined) setTabIndex(index);
  }, [index, open]);
  const handleClose = () => {
    setCreatorDialog((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleClickFavorite = () => {
    setFavoritedCreatorIds((prev) => {
      let prevList = _.cloneDeep(prev);
      if (prevList.includes(id)) {
        prevList = _.filter(prevList, (el) => el !== id);
      } else {
        prevList = [...prevList, id];
      }
      return prevList;
    });
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
      className={queryName}
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
            title={"크리에이터 정보"}
            onClose={handleClose}
          >
            {creator && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  p: theme.spacing(2, 3, 4, 3),
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      width: 40,
                      height: 40,
                      backgroundColor: `${
                        favorited ? pink[500] : "#ffffff"
                      } !important`,
                      border: `1px solid ${
                        favorited ? pink[500] : blueGrey[100]
                      }`,
                      boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
                      zIndex: 98,
                      borderRadius: 0.5,
                      transition: "none",
                    }}
                    onClick={handleClickFavorite}
                  >
                    <Icon
                      name="heart"
                      prefix="fas"
                      size={20}
                      color={favorited ? "#ffffff" : blueGrey[300]}
                    />
                  </IconButton>
                  <Box
                    sx={{
                      position: "relative",
                      width: 168,
                      height: 168,
                      borderRadius: "50%",
                      border: `1px solid ${blueGrey[100]} !important`,
                      overflow: "hidden",
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
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                    pl: 3,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 0.5,
                        borderRadius: 0.5,
                        mr: 0.5,
                        height: 24,
                        p: theme.spacing(0, 1),
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: blueGrey[50],
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          lineHeight: "16px",
                          fontWeight: "700",
                          color: blueGrey[500],
                        }}
                      >
                        뷰티/패션
                      </Typography>
                    </Box>
                    <Typo
                      lines={1}
                      sx={{
                        fontSize: 20,
                        lineHeight: "32px",
                        fontWeight: "700",
                        color: blueGrey[900],
                        wordBreak: "break-all",
                      }}
                    >
                      {creator.title}
                    </Typo>
                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 14,
                        lineHeight: "20px",
                        color: blueGrey[700],
                      }}
                    >
                      구독자 {`${setKoNumber(creator.subscriberCount)}명`}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                        gridAutoColumn: "1fr",
                        gridTemplateRows: "auto",
                        gridRowGap: 0,
                        backgroundColor: blueGrey[50],
                        borderRadius: 1,
                        p: 1,
                      }}
                    >
                      <DataCell label="영향력 지수" value={`높음`} />
                      <DataCell label="트렌드 지수" value={`56점`} />
                      <DataCell label="타겟 적합도" value={`${98}%`} />
                      <DataCell
                        label="예상 CPV"
                        value={
                          creator.CPV
                            ? `${creator.CPV.toFixed(0)}원/회`
                            : "집계중"
                        }
                      />
                      <DataCell label="평균 단가" value={`3,230만원`} />
                      <DataCell label="집행가능일" value={`11월 1일~`} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                p: theme.spacing(0, 2, 0, 2),
              }}
            >
              <TabBar
                color="secondary"
                title="creatorDialog"
                tabs={creatorDialogTabs}
                index={tabIndex}
                setIndex={setTabIndex}
              />
            </Box>
          </PaperHeader>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
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
              <Slide>
                <List
                  data={playlists}
                  filters={playlistFilters}
                  sorts={playlistSorts}
                  columns={3}
                  renderList={(data) => {
                    return data.map((item, index) => (
                      <PlaylistItem
                        key={index}
                        item={item}
                        checkMode={checkMode}
                        forceCheck={forceCheck}
                        inCreator
                      />
                    ));
                  }}
                  title="플레이리스트가"
                />
              </Slide>
              <Slide>
                <List
                  data={videos}
                  filters={videoFilters}
                  sorts={videoSorts}
                  spacing={1}
                  renderList={(data) => {
                    return data.map((item, index) => (
                      <VideoItem key={index} item={item} inCreator />
                    ));
                  }}
                  title="광고영상이"
                />
              </Slide>
              <Slide>
                <Box
                  sx={{
                    p: theme.spacing(4, 3, 2, 3),
                  }}
                >
                  <Box
                    sx={{
                      ml: -7.5,
                      mr: -7.5,
                    }}
                  >
                    <img src="/images/creator-0.png" />
                    <img src="/images/creator-1.png" />
                  </Box>
                </Box>
              </Slide>
              <Slide>
                <Box
                  sx={{
                    p: theme.spacing(4, 3, 2, 3),
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
                    채널 스코어 분석
                  </Typography>
                  <Box
                    sx={{
                      m: `0 auto`,
                      width: 320,
                      height: 280,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Chart
                        type="radar"
                        data={totalChartData}
                        options={totalChartOptions}
                      />
                    </Box>
                  </Box>
                  <Stack
                    // direction="row"
                    spacing={0}
                    sx={{
                      mt: 4,
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: `repeat(${2}, 1fr)`,
                      gridAutoColumn: "1fr",
                      gridTemplateRows: "auto",
                      gridRowGap: 16,
                      gridColumnGap: 16,
                    }}
                  >
                    {[
                      {
                        title: "트렌드 지수",
                        value: "56점",
                        reason: '설명이 들어갈 예정입니다.'
                      },
                      {
                        title: "광고 기획력",
                        value: "56점",
                        reason: '설명이 들어갈 예정입니다.'
                      },
                      {
                        title: "이행 지수",
                        value: "95점",
                        reason: '설명이 들어갈 예정입니다.'
                      },
                      {
                        title: "영향력 지수",
                        value: "74점",
                        reason: '설명이 들어갈 예정입니다.'
                      },
                      {
                        title: "광고 지수",
                        value: "16점",
                        reason: '설명이 들어갈 예정입니다.'
                      },
                      {
                        title: "클린 지수",
                        value: "8점",
                        reason: '설명이 들어갈 예정입니다.'
                      },
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: 1,
                          border: `1px solid ${blueGrey[100]}`,
                          p: 2,
                          flex: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 16,
                            lineHeight: "24px",
                            fontWeight: "700",
                          }}
                        >
                          {item.value}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            p: 2,
                            borderRadius: 1,
                            backgroundColor: blueGrey[50],
                            mt: 2,
                          }}
                        >
                          {item.reason}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Slide>
            </SwipeableViews>
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
}
const totalChartData = {
  labels: [
    "트렌드 지수",
    "광고 기획력",
    "이행 지수",
    "영향력 지수",
    "광고 지수",
    "클린 지수",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 90, 81, 56, 40],
      fill: true,
      pointRadius: 6,
      pointBorderWidth: 6,
      borderWidth: 8,
      backgroundColor: youhaBlue[500],
      borderColor: youhaBlue[500],
      pointBackgroundColor: blueGrey[50],
      pointBorderColor: youhaBlue[500],
      pointHoverBackgroundColor: blueGrey[50],
      pointHoverBorderColor: youhaBlue[500],
    },
  ],
};
const totalChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    r: {
      ticks: {
        display: false,
        background: blueGrey[50],
        font: {
          size: 14,
          family: "Pretendard",
          weight: "700",
        },
        color: blueGrey[700],
      },
      pointLabels: {
        font: {
          size: 14,
          family: "Pretendard",
          weight: "700",
        },
      },
      angleLines: {
        display: false,
      },
      suggestedMin: 50,
      suggestedMax: 100,
    },
  },
  maintainAspectRatio: false,
};
