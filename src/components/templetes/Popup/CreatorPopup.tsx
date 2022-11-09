import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  creatorFilters,
  creatorPopupTabs,
  creatorSorts,
} from "../../../constants";
import {
  checkedCreatorIdsState,
  favoritedCreatorIdsState,
  testCreators,
} from "../../../datas";
import { creatorPopupState } from "../../../recoil";
import { theme } from "../../../themes/theme";
import Icon from "../../atoms/Icon";
import TextField from "../../atoms/TextInput";
import CreatorItem from "../../organisms/CreatorItem";
import TabBar from "../../molecules/TabBar";
import SwipeableViews from "react-swipeable-views";
import _ from "lodash";
import PaperHeader from "../../molecules/PaperHeader";
import { useRouter } from "next/router";
import List from "../../atoms/List";
import { Page } from "../Dialog/EstimateConfirmDialog";
import Slide from "../../atoms/Slide";

export default function CreatorPopup() {
  const router = useRouter();
  const searchRef = useRef<any>(null);
  const [input, setInput] = useState<{ search: string }>({ search: "" });
  const [creatorPopup, setCreatorPopup] = useRecoilState(creatorPopupState);
  const checkedCreatorIds = useRecoilValue(checkedCreatorIdsState);
  const favoritedCreatorIds = useRecoilValue(favoritedCreatorIdsState);
  const { queryName, open } = creatorPopup;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const creators =
    input.search === ""
      ? testCreators
      : _.filter(testCreators, (el) => el.title.includes(input.search));
  const favoritedCreators =
    input.search === ""
      ? _.filter(creators, (el) => favoritedCreatorIds.includes(el.id))
      : _.filter(
          _.filter(creators, (el) => favoritedCreatorIds.includes(el.id)),
          (el) => el.title.includes(input.search)
        );
  const confirmable = checkedCreatorIds.length > 0;
  useEffect(() => {
    handleClose();
  }, [router]);
  const handleClose = () => {
    setCreatorPopup((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput((prev) => {
      return {
        ...prev,
        search: value,
      };
    });
  };
  const handleResetSearch = () => {
    setInput((prev) => {
      return {
        ...prev,
        search: "",
      };
    });
  };
  const handleClickConfirm = () => {
    handleClose();
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
          left: `${(376 + 16) * 2 + 24}px`,
          "@media(min-width: 1600px)": {
            left: `calc((100vw - 1600px) / 2 + ${(376 + 16) * 2 + 24}px)`,
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
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
          className={`PaperTarget-${queryName}`}
        >
          <PaperHeader title="크리에이터 찾기" onClose={handleClose}>
            <Box
              sx={{
                p: theme.spacing(0, 3, 0, 3),
              }}
            >
              <TextField
                startAdornmentName="search"
                inputRef={searchRef}
                value={input.search}
                onChange={handleChangeSearch}
                onReset={handleResetSearch}
                placeholder="크리에이터 이름을 검색하세요!"
                type="text"
              />
            </Box>
            <Box
              sx={{
                p: theme.spacing(0, 2, 0, 2),
              }}
            >
              <TabBar
                color="secondary"
                title="creator"
                tabs={creatorPopupTabs}
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
                  data={creators}
                  filters={creatorFilters}
                  sorts={creatorSorts}
                  columns={2}
                  renderList={(data) => {
                    return data.map((item, index) => (
                      <CreatorItem
                        key={index}
                        item={item}
                        checkMode
                        tempCheck
                      />
                    ));
                  }}
                  title="크리에이터가"
                />
              </Slide>
              <Slide>
                <List
                  data={favoritedCreators}
                  filters={creatorFilters}
                  sorts={creatorSorts}
                  columns={2}
                  renderList={(data) => {
                    return data.map((item, index) => (
                      <CreatorItem
                        key={index}
                        item={item}
                        checkMode
                        tempCheck
                      />
                    ));
                  }}
                  title="크리에이터가"
                />
              </Slide>
            </SwipeableViews>
          </Box>
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
            fullWidth
            color="secondary"
            sx={{
              minHeight: 48,
              height: 48,
              boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
            }}
            disabled={!confirmable}
            onClick={handleClickConfirm}
          >
            <Icon
              name="users"
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
              {checkedCreatorIds.length === 0
                ? "크리에이터 선택"
                : `${checkedCreatorIds.length}명의 크리에이터 담기`}
            </Typography>
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}
