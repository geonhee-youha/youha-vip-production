import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey, pink } from "@mui/material/colors";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { favoritedVideoIdsState, testCreators } from "../../datas";
import { creatorDialogState } from "../../recoil";
import { theme } from "../../themes/theme";
import { displayedAt, setKoNumber } from "../../utils";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";

export default function VideoItem({
  item,
  inCreator,
}: {
  item: any;
  inCreator?: boolean;
}) {
  const { id, thumbnail, title, description, href, viewCount, publishedAt } =
    item;
  const [favoritedVideoIds, setFavoritedVideoIds] = useRecoilState(
    favoritedVideoIdsState
  );
  const favorited = favoritedVideoIds.includes(id);
  const setCreatorDialog = useSetRecoilState(creatorDialogState);
  const handleClick = () => {
    window.open(href);
  };
  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => {
    if (index === null) setIndex(Math.floor(Math.random() * 8));
  }, [index]);
  const creator =
    index === null
      ? {
          title: "",
          thumbnail: "",
          subscriberCount: 0,
        }
      : testCreators[index];
  const handleClickFavorite = () => {
    setFavoritedVideoIds((prev) => {
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
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        alignSelf: inCreator ? "initial" : "stretch",
        justifySelf: inCreator ? "initial" : "stretch",
      }}
    >
      <ButtonBase
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: inCreator ? "row" : "column",
          alignItems: "flex-start",
          alignSelf: inCreator ? "initial" : "stretch",
          justifySelf: inCreator ? "initial" : "stretch",
          borderRadius: 1,
          border: `1px solid ${blueGrey[100]} !important`,
          overflow: "hidden",
          boxShadow: `2px 2px 4px 0px ${alpha("#000000", 0.08)}`,
          "& *": {
            cursor: "pointer",
          },
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Box
          sx={{
            position: "relative",
            // overflow: "hidden",
            width: inCreator ? 160 / 0.5625 : "100%",
            pt: inCreator ? `${160}px` : "56.25%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -1,
              left: -1,
              right: -1,
              bottom: -1,
              borderRadius: 1,
              overflow: "hidden",
              border: `1px solid ${blueGrey[100]} !important`,
              zIndex: 9
            }}
          >
            <img
              src={thumbnail}
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
            alignSelf: inCreator ? "initial" : "stretch",
            p: theme.spacing(2, 2, !inCreator ? 11 : 2, 2),
          }}
        >
          <Typo
            lines={2}
            sx={{
              minHeight: 48,
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: "700",
              color: blueGrey[900],
              wordBreak: "break-all",
            }}
          >
            {title}
          </Typo>
          <Typo
            lines={2}
            sx={{
              mt: 0.5,
              fontSize: 14,
              lineHeight: "20px",
              color: blueGrey[500],
              wordBreak: "break-all",
            }}
          >
            {description}
          </Typo>
          <Stack
            // direction="row"
            spacing={1}
            sx={{ mt: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon
                prefix="fad"
                name="eye"
                size={14}
                sx={{
                  maxWidth: 18,
                  mr: 0.5,
                  color: blueGrey[500],
                }}
              />
              <Typo
                lines={2}
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: blueGrey[500],
                  fontWeight: "700",
                  wordBreak: "break-all",
                }}
              >
                {setKoNumber(viewCount)}회
              </Typo>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon
                prefix="fad"
                name="calendar"
                size={14}
                sx={{
                  maxWidth: 18,
                  mr: 0.5,
                  color: blueGrey[500],
                }}
              />
              <Typo
                lines={2}
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: blueGrey[500],
                  fontWeight: "700",
                }}
              >
                {displayedAt(publishedAt, true)}
              </Typo>
            </Box> */}
          </Stack>
        </Box>
      </ButtonBase>
      {!inCreator && index !== null && (
        <ButtonBase
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderTop: `1px solid ${blueGrey[100]}`,
            p: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
          onClick={handleClickCreator}
        >
          <Box
            sx={{
              position: "relative",
              width: 40,
              height: 40,
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
              pl: 1,
              flex: 1,
            }}
          >
            <Typo
              lines={1}
              sx={{
                fontSize: 14,
                lineHeight: "20px",
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
                fontSize: 12,
                lineHeight: "16px",
                color: blueGrey[700],
                wordBreak: "break-all",
              }}
            >
              구독자 {`${setKoNumber(creator.subscriberCount)}명`}
            </Typography>
          </Box>
        </ButtonBase>
      )}
      <Stack
        spacing={1}
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
        }}
      >
        <IconButton
          sx={{
            width: 32,
            height: 32,
            backgroundColor: `${favorited ? pink[500] : "#ffffff"} !important`,
            border: `1px solid ${favorited ? pink[500] : blueGrey[100]}`,
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
            size={16}
            color={favorited ? "#ffffff" : blueGrey[300]}
          />
        </IconButton>
      </Stack>
    </Box>
  );
}
