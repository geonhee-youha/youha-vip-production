import {
  alpha,
  Box,
  ButtonBase,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey, pink } from "@mui/material/colors";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { videoFilters, videoSorts } from "../../../constants";
import {
  favoritedCreatorIdsState,
  favoritedPlaylistIdsState,
  testCreators,
  testPlaylists,
  testVideos,
} from "../../../datas";
import { creatorDialogState, playlistDialogState } from "../../../recoil";
import { theme } from "../../../themes/theme";
import { setKoNumber } from "../../../utils";
import Icon from "../../atoms/Icon";
import Typo from "../../atoms/Typo";
import PaperHeader from "../../molecules/PaperHeader";
import VideoItem from "../../organisms/VideoItem";
import Slide from "../../atoms/Slide";
import List from "../../atoms/List";

export default function PlaylistDialog() {
  const [playlistDialog, setPlaylistDialog] =
    useRecoilState(playlistDialogState);
  const [favoritedPlaylistIds, setFavoritedPlaylistIds] = useRecoilState(
    favoritedPlaylistIdsState
  );
  const [favoritedCreatorIds, setFavoritedCreatorIds] = useRecoilState(
    favoritedCreatorIdsState
  );
  const [creatorDialog, setCreatorDialog] = useRecoilState(creatorDialogState);
  const { queryName, open, id, index } = playlistDialog;
  const playlist = testPlaylists.flatMap((el) => el.playlistItems)[
    _.findIndex(
      testPlaylists.flatMap((el) => el.playlistItems),
      (el) => el.id === id
    )
  ];
  const item = playlist;
  const videos = testVideos;
  const [creatorIndex, setCreatorIndex] = useState<number | null>(null);
  useEffect(() => {
    if (creatorIndex === null) setCreatorIndex(Math.floor(Math.random() * 8));
  }, [creatorIndex]);
  const creator =
    creatorIndex === null
      ? {
          id: "",
          title: "",
          thumbnail: "",
          subscriberCount: 0,
        }
      : testCreators[creatorIndex];
  const favorited = favoritedPlaylistIds.includes(id);
  const creatorFavorited = favoritedCreatorIds.includes(creator.id);
  const handleClose = () => {
    setPlaylistDialog((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleClickFavorite = () => {
    setFavoritedPlaylistIds((prev) => {
      let prevList = _.cloneDeep(prev);
      if (prevList.includes(id)) {
        prevList = _.filter(prevList, (el) => el !== id);
      } else {
        prevList = [...prevList, id];
      }
      return prevList;
    });
  };
  const handleClickCreator = () => {
    setCreatorDialog((prev) => {
      return {
        ...prev,
        open: true,
        id: creator.id,
        index: 0,
      };
    });
  };
  const handleClickCreatorFavorite = () => {
    setFavoritedCreatorIds((prev) => {
      let prevList = _.cloneDeep(prev);
      if (prevList.includes(creator.id)) {
        prevList = _.filter(prevList, (el) => el !== creator.id);
      } else {
        prevList = [...prevList, creator.id];
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
          width: 376 * 2 + 16,
          minWidth: 376 * 2 + 16,
          maxWidth: 376 * 2 + 16,
          height: `calc((100vh - ${24 * 2}px))`,
          maxHeight: `calc((100vh - ${24 * 2}px))`,
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
            title={"기획안 정보"}
            onClose={handleClose}
            borderBottom
          >
            {playlist && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  p: theme.spacing(2, 3, 2, 3),
                }}
              >
                <Box>
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
                        width: 168 / 0.5625,
                        height: 168,
                        borderRadius: 1,
                        border: `1px solid ${blueGrey[100]} !important`,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.snippet?.thumbnails["maxres"]?.url}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          objectFit: "cover",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: alpha("#000000", 0.8),
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 16,
                            lineHeight: "24px",
                            color: "#ffffff",
                            fontWeight: "700",
                          }}
                        >
                          {item.count}
                        </Typography>
                        <Icon
                          name="list-ul"
                          prefix="fas"
                          size={20}
                          color="#ffffff"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {creator && (
                    <Stack
                      // direction="row"
                      spacing={2}
                      sx={{
                        mt: 2,
                        // p: theme.spacing(4, 3, 2, 3),
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <ButtonBase
                          sx={{
                            borderRadius: 1,
                            border: `1px solid ${blueGrey[100]}`,
                            boxShadow: `2px 2px 4px 0px ${alpha(
                              "#000000",
                              0.08
                            )}`,
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            p: theme.spacing(1, 1.5),
                          }}
                          onClick={handleClickCreator}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              width: 48,
                              height: 48,
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
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              ml: 2,
                            }}
                          >
                            {/* <Box
                          sx={{
                            borderRadius: 0.5,
                            mr: 0.5,
                            height: 20,
                            p: theme.spacing(0, 0.75),
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
                        </Box> */}
                            <Typo
                              lines={1}
                              sx={{
                                fontSize: 16,
                                lineHeight: "24px",
                                fontWeight: "700",
                                color: blueGrey[900],
                                wordBreak: "break-all",
                                width: 168 / 0.5625 - 136,
                              }}
                            >
                              {creator.title}
                            </Typo>
                            <Typography
                              sx={{
                                mt: 0.5,
                                fontSize: 12,
                                lineHeight: "16px",
                                color: blueGrey[700],
                              }}
                            >
                              구독자{" "}
                              {`${setKoNumber(creator.subscriberCount)}명`}
                            </Typography>
                          </Box>
                        </ButtonBase>
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: 16,
                            transform: "translateY(-50%)",
                            width: 32,
                            height: 32,
                            backgroundColor: `${
                              creatorFavorited ? pink[500] : "#ffffff"
                            } !important`,
                            border: `1px solid ${
                              creatorFavorited ? pink[500] : blueGrey[100]
                            }`,
                            boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
                            zIndex: 98,
                            borderRadius: 0.5,
                            transition: "none",
                          }}
                          onClick={handleClickCreatorFavorite}
                        >
                          <Icon
                            name="heart"
                            prefix="fas"
                            size={16}
                            color={creatorFavorited ? "#ffffff" : blueGrey[300]}
                          />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          position: "relative",
                        }}
                      ></Box>
                    </Stack>
                  )}
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
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
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
                      {item.snippet.title}
                    </Typo>
                  </Box>
                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 14,
                      lineHeight: "20px",
                      color: blueGrey[700],
                    }}
                  >
                    {item.snippet.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        prefix="fad"
                        name="money-bill"
                        size={16}
                        sx={{
                          mr: 0.5,
                          color: blueGrey[500],
                        }}
                      />
                      <Typo
                        lines={2}
                        sx={{
                          fontSize: 16,
                          lineHeight: "24px",
                          color: blueGrey[500],
                          fontWeight: "700",
                        }}
                      >
                        {setKoNumber(32450000)}원
                      </Typo>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            )}
          </PaperHeader>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              overflow: "hidden",
              width: "100%",
            }}
          >
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
                title="플레이리스트가"
              />
            </Slide>
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
}
