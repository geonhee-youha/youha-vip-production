import { alpha, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import _ from "lodash";
import { useSetRecoilState } from "recoil";
import { AdProps, testAdSets, testCreators } from "../../datas";
import { adDialogState } from "../../recoil";
import { theme } from "../../themes/theme";
import youhaBlue from "../../themes/youhaBlue";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";

export default function AdItem({
  item,
  index,
  checklist,
}: {
  item: AdProps;
  index?: number;
  checklist?: boolean;
}) {
  const { id, check } = item;
  const setAdDialog = useSetRecoilState(adDialogState);
  const adSet =
    testAdSets[_.findIndex(testAdSets, (el) => el.id === item.set.id)];
  const manager = adSet.manager;
  const creator =
    testCreators[_.findIndex(testCreators, (el) => el.id === item.creator.id)];
  const handleClick = () => {
    setAdDialog((prev) => {
      return {
        ...prev,
        open: true,
        id: id,
      };
    });
  };
  const checkCount = _.filter(
    [check.date, check.pay],
    (el) => el === true
  ).length;
  const checkCompleted = checkCount === 2;
  return (
    <ButtonBase
      sx={
        checklist
          ? {
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
            }
          : {
              width: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderRadius: 1,
              p: 2,
              border: `1px solid ${blueGrey[100]}`,
              overflow: "hidden",
              boxShadow: `2px 2px 4px 0px ${alpha("#000000", 0.08)}`,
              "& *": {
                cursor: "pointer",
              },
              cursor: "pointer",
            }
      }
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: checklist ? "row" : "column",
          alignItems: checklist ? "center" : "initial",
          pl: checklist ? 2 : 0,
          pr: checklist ? 2 : 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 64,
            height: 64,
            borderRadius: 1,
            border: `1px solid ${blueGrey[100]} !important`,
            backgroundColor: blueGrey[100],
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
          sx={
            checklist
              ? {
                  pl: 2,
                  width: 200,
                  pr: 2,
                }
              : {
                  flex: 1,
                  mt: 2,
                }
          }
        >
          {/* <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
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
                backgroundColor: youhaBlue[50],
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "700",
                  // color: colors[adSet.id][500],
                  color: blueGrey[500],
                }}
              >
                {adSet.title}
              </Typography>
            </Box>
          </Box> */}
          <Typo
            lines={10}
            sx={{
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: "700",
              color: blueGrey[900],
              wordBreak: "break-all",
            }}
          >
            {`${
              testCreators[
                _.findIndex(testCreators, (el) => el.id === item.creator.id)
              ].title
            } ${item.title}`}
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
            {item.description}
          </Typo>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pt: checklist ? 0 : 2,
            }}
          >
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
          {checklist && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mt: 1.5, width: 160 }}
            >
              <Typo
                lines={1}
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "700",
                  color: youhaBlue[500],
                  wordBreak: "break-all",
                }}
              >
                {`${checkCount} / 2`} {checkCompleted ? "완료" : "진행중"}
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
                    backgroundColor: youhaBlue[500],
                    borderRadius: 12,
                    width: `${(checkCount / 2) * 100}%`,
                  }}
                />
              </Box>
            </Stack>
          )}
        </Box>
      </Box>
      {checklist ? (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ flex: 1, pr: 2 }}
        >
          <Box
            sx={{
              width: 56,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: check.pay ? youhaBlue[500] : blueGrey[200],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name={check.pay ? "check" : "xmark-large"}
                prefix="fas"
                size={16}
                color={"#ffffff"}
              />
            </Box>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 12,
                lineHeight: "16px",
                fontWeight: "700",
                color: check.pay ? youhaBlue[500] : blueGrey[200],
                textAlign: "center",
              }}
            >
              비용 {check.pay ? `완료` : `진행중`}
            </Typography>
            <Typography
              sx={{
                mt: 0.25,
                fontSize: 10,
                lineHeight: "14px",
                color: check.pay ? youhaBlue[500] : blueGrey[200],
                textAlign: "center",
              }}
            >
              2022.10.11
            </Typography>
          </Box>
          <Box
            sx={{
              width: 56,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: check.date ? youhaBlue[500] : blueGrey[200],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name={check.date ? "check" : "xmark-large"}
                prefix="fas"
                size={16}
                color={"#ffffff"}
              />
            </Box>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 12,
                lineHeight: "16px",
                fontWeight: "700",
                color: check.date ? youhaBlue[500] : blueGrey[200],
                textAlign: "center",
              }}
            >
              일정 {check.date ? `완료` : `진행중`}
            </Typography>
            <Typography
              sx={{
                mt: 0.25,
                fontSize: 10,
                lineHeight: "14px",
                color: check.date ? youhaBlue[500] : blueGrey[200],
                textAlign: "center",
              }}
            >
              2022.10.11
            </Typography>
          </Box>
        </Stack>
      ) : (
        <>
          <Stack
            spacing={1}
            sx={{
              borderRadius: 1,
              background: blueGrey[50],
              width: "100%",
              mt: 2,
              p: 2,
            }}
          >
            {item.logs.map((item: any, index: number) => (
              <Box key={index} sx={{}}>
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: blueGrey[800],
                    fontWeight: "700",
                  }}
                >
                  {item.body}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 10,
                    lineHeight: "14px",
                    color: blueGrey[800],
                  }}
                >
                  {item.createdAt}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Typography
            sx={{
              mt: 1,
              width: "100%",
              fontSize: 12,
              lineHeight: "16px",
              color: blueGrey[500],
              textAlign: "right",
            }}
          >
            {item.changedAt} 변경됨
          </Typography>
        </>
      )}
    </ButtonBase>
  );
}
