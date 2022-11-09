import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { blueGrey, cyan, pink } from "@mui/material/colors";
import _ from "lodash";
import { useSetRecoilState } from "recoil";
import { AdSetProps, testAds, testCreators } from "../../datas";
import { adSetDialogState } from "../../recoil";
import { theme } from "../../themes/theme";
import youhaBlue from "../../themes/youhaBlue";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";

export default function AdSetItem({
  item,
  index,
}: {
  item: AdSetProps;
  index?: number;
}) {
  const setAdSetDialog = useSetRecoilState(adSetDialogState);
  const adThumbnailSize = 28;
  const { id, title, description, manager, status } = item;
  const ads = _.filter(testAds, (el) => el.set.id === id);
  const pre = status.value === "1";
  const completed = status.value === "3";
  const preAds = _.filter(
    ads,
    (el) => el.status.value === "0" || el.status.value === "1"
  );
  const proceeedingAds = _.filter(ads, (el) => el.status.value === "7");
  const handleClick = () => {
    setAdSetDialog((prev) => {
      return {
        ...prev,
        open: true,
        id: id,
        index: 0,
      };
    });
  };
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <ButtonBase
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "hidden",
          "& *": {
            cursor: "pointer",
          },
          cursor: "pointer",
          borderTop: `${index === 0 ? 0 : 1}px solid${blueGrey[100]}`,
          pt: 1.5,
          pb: 1.5,
          pr: completed ? 16 : 0,
        }}
        onClick={handleClick}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: 100,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: 0.5,
                mr: 0.5,
                height: 24,
                p: theme.spacing(0, 1),
                display: "flex",
                alignItems: "center",
                backgroundColor: pre
                  ? cyan[50]
                  : completed
                  ? youhaBlue[50]
                  : pink[50],
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "700",
                  color: pre
                    ? cyan[500]
                    : completed
                    ? youhaBlue[500]
                    : pink[500],
                }}
              >
                {pre ? "계약중" : completed ? "완료" : "진행중"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${ads.length > 1 ? 2 : 1}, 1fr)`,
              gridAutoColumn: "1fr",
              gridTemplateRows: "auto",
              gridRowGap: 2,
              gridColumnGap: 2,
              width: adThumbnailSize * 2,
              height: ads.length > 2 ? adThumbnailSize * 2 : adThumbnailSize,
            }}
          >
            {ads.map((item, index) => {
              const creator =
                testCreators[
                  _.findIndex(testCreators, (el) => el.id === item.creator.id)
                ];
              return (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    borderRadius: 0.5,
                    border: `1px solid ${blueGrey[100]} !important`,
                    backgroundColor: blueGrey[100],
                    overflow: "hidden",
                    boxShadow: `2px 2px 4px 0px ${alpha("#000000", 0.08)}`,
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
              );
            })}
          </Box>
          <Box
            sx={{
              pl: 4,
              pr: 4,
              width: 280,
            }}
          >
            <Typo
              lines={10}
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
                color: blueGrey[900],
              }}
            >
              {title}
            </Typo>
            <Typo
              lines={1}
              sx={{
                mt: 0.5,
                fontSize: 14,
                lineHeight: "20px",
                color: blueGrey[700],
              }}
            >
              {description}
            </Typo>
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: `1px solid ${blueGrey[100]} !important`,
                  backgroundColor: blueGrey[100],
                  overflow: "hidden",
                }}
              >
                <img
                  src={manager.thumbnail}
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
                    fontSize: 12,
                    lineHeight: "16px",
                    fontWeight: "700",
                    color: blueGrey[900],
                    wordBreak: "break-all",
                  }}
                >
                  {manager.name} 매니저
                </Typo>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 1.5, width: 200 }}
              >
                <Typo
                  lines={1}
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    fontWeight: "700",
                    color: pre
                      ? cyan[500]
                      : completed
                      ? youhaBlue[500]
                      : pink[500],
                    wordBreak: "break-all",
                  }}
                >
                  {pre
                    ? ads.length - preAds.length
                    : completed
                    ? ads.length
                    : proceeedingAds.length}
                  /{ads.length} {pre ? "계약중" : completed ? "완료" : "진행중"}
                </Typo>
                <Box
                  sx={{
                    flex: 1,
                    position: "relative",
                    height: 8,
                    borderRadius: 12,
                    backgroundColor: blueGrey[100],
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      backgroundColor: pre
                        ? cyan[500]
                        : completed
                        ? youhaBlue[500]
                        : pink[500],
                      borderRadius: 12,
                      width: `${
                        ((pre
                          ? ads.length - preAds.length
                          : completed
                          ? ads.length
                          : proceeedingAds.length) /
                          ads.length) *
                        100
                      }%`,
                    }}
                  />
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </ButtonBase>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          p: theme.spacing(1.5, 2),
          alignItems: "center",
          opacity: !completed ? 0.3 : 1,
        }}
      >
        <Tooltip title="성과 리포트 보기">
          <IconButton
            sx={{
              width: 40,
              height: 40,
              backgroundColor: `${blueGrey[50]} !important`,
            }}
            disabled={!completed}
          >
            <Icon name="file" prefix="fas" size={20} color={blueGrey[700]} />
          </IconButton>
        </Tooltip>
        <Tooltip title="최종 계약서 다운로드">
          <IconButton
            sx={{
              width: 40,
              height: 40,
              backgroundColor: `${blueGrey[50]} !important`,
              ml: 1,
            }}
            disabled={!completed}
          >
            <Icon
              name="paperclip"
              prefix="fas"
              size={20}
              color={blueGrey[700]}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
