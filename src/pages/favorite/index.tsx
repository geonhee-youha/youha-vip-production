import { Box, Paper } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useRecoilValue } from "recoil";
import List from "../../components/atoms/List";
import Slide from "../../components/atoms/Slide";
import PaperHeader from "../../components/molecules/PaperHeader";
import CreatorItem from "../../components/organisms/CreatorItem";
import PlaylistItem from "../../components/organisms/PlaylistItem";
import VideoItem from "../../components/organisms/VideoItem";
import TabBar from "../../components/molecules/TabBar";
import {
  creatorFilters,
  creatorSorts,
  favoriteTabs,
  pages,
} from "../../constants";
import {
  favoritedCreatorIdsState,
  favoritedPlaylistIdsState,
  favoritedVideoIdsState,
  testCreators,
  testPlaylists,
  testVideos,
} from "../../datas";
import { theme } from "../../themes/theme";
export default function Page() {
  const router = useRouter();
  const currentPathName = `/${router.pathname.split("?")[0].split("/")[1]}`;
  const currentSlugPathName = `/${router.pathname.split("?")[0].split("/")[2]}`;
  const pageTitle =
    currentSlugPathName !== "/undefined"
      ? `${
          _.findLast(
            _.findLast(pages, (el) => el.pathName === currentPathName)?.slugs,
            (el) => el.pathName === currentSlugPathName
          )?.title
        }`
      : `${_.findLast(pages, (el) => el.pathName === currentPathName)?.title}`;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const favoritedCreatorIds = useRecoilValue(favoritedCreatorIdsState);
  const favoritedPlaylistIds = useRecoilValue(favoritedPlaylistIdsState);
  const favoritedVideoIds = useRecoilValue(favoritedVideoIdsState);
  const creators = _.filter(testCreators, (el) =>
    favoritedCreatorIds.includes(el.id)
  );
  const playlists = _.filter(
    testPlaylists.flatMap((el) => el.playlistItems),
    (el) => favoritedPlaylistIds.includes(el.id)
  );
  const videos = _.filter(testVideos, (el) =>
    favoritedVideoIds.includes(el.id)
  );
  const queryName = `page-${currentPathName.replace("/", "")}`;
  return (
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
        <PaperHeader queryName={queryName} title={pageTitle} big>
          <Box
            sx={{
              p: theme.spacing(0, 2, 0, 2),
            }}
          >
            <TabBar
              color="secondary"
              title="creatorDialog"
              tabs={favoriteTabs}
              index={tabIndex}
              setIndex={setTabIndex}
              // counts={[
              //   _.filter(testCreators, (el) =>
              //     favoritedCreatorIds.includes(el.id)
              //   ).length,
              //   _.filter(
              //     testPlaylists.flatMap((el) => el.playlistItems),
              //     (el) => favoritedPlaylistIds.includes(el.id)
              //   ).length,
              //   _.filter(testVideos, (el) => favoritedVideoIds.includes(el.id))
              //     .length,
              // ]}
            />
          </Box>
        </PaperHeader>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
            width: "100%",
            position: "relative",
            "& .react-swipeable-view-container": {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              height: "100%",
              width: "100%",
              "& > div": {
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
              },
            },
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
            <Slide sx={{height: 4000}}>
              <List
                data={creators}
                filters={creatorFilters}
                sorts={creatorSorts}
                columns={3}
                renderList={(data) => {
                  return data.map((item, index) => (
                    <CreatorItem key={index} item={item} />
                  ));
                }}
                title="크리에이터가"
              />
            </Slide>
            <Slide>
              <List
                data={playlists}
                filters={creatorFilters}
                sorts={creatorSorts}
                columns={4}
                renderList={(data) => {
                  return data.map((item, index) => (
                    <PlaylistItem key={index} item={item} />
                  ));
                }}
                title="기획안이"
              />
            </Slide>
            <Slide>
              <List
                data={videos}
                filters={creatorFilters}
                sorts={creatorSorts}
                columns={4}
                renderList={(data) => {
                  return data.map((item, index) => (
                    <VideoItem key={index} item={item} />
                  ));
                }}
                title="광고영상이"
              />
            </Slide>
          </SwipeableViews>
        </Box>
      </Box>
    </Paper>
  );
}
