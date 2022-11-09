import { Box, ButtonBase, IconButton, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CampaignProps } from "../../datas";
import { campaignDialogState, campaignDrawerState } from "../../recoil";
import { theme } from "../../themes/theme";
import youhaBlue from "../../themes/youhaBlue";
import Icon from "../atoms/Icon";
export default function CampaignItem({
  item,
  index,
  checkMode,
  inHome,
}: {
  item: CampaignProps;
  index?: number;
  checkMode?: boolean;
  inHome?: boolean;
}) {
  const { id, title, description, categories, sex, ages } = item;
  const [campaignDrawer, setCampaignDrawer] =
    useRecoilState(campaignDrawerState);
  const setCampaignDialog = useSetRecoilState(campaignDialogState);
  const checked = campaignDrawer.selectedCampaignIds.includes(id);
  const handleClick = () => {
    setCampaignDialog((prev) => {
      return {
        ...prev,
        open: true,
        id: id,
      };
    });
  };
  const handleClickCheck = () => {
    setCampaignDrawer((prev) => {
      return {
        ...prev,
        selectedCampaignIds: prev.selectedCampaignIds.includes(id) ? [] : [id],
      };
    });
  };
  return (
    <Box
      sx={
        inHome
          ? {
              position: "sticky",
              top: 0,
              zIndex: 9999,
              backgroundColor: "#ffffff",
              borderBottom: `1px solid ${blueGrey[100]}`,
            }
          : {
              position: "relative",
            }
      }
    >
      {checkMode && !inHome && (
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            backgroundColor: `${
              checked ? youhaBlue[500] : "#ffffff"
            } !important`,
            border: `1px solid ${checked ? youhaBlue[500] : blueGrey[100]}`,
            boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08)`,
            zIndex: 98,
            borderRadius: 0.5,
            transition: "none",
          }}
          onClick={handleClickCheck}
        >
          <Icon
            name="check"
            prefix="fas"
            size={16}
            color={checked ? "#ffffff" : blueGrey[300]}
          />
        </IconButton>
      )}
      <ButtonBase
        sx={
          inHome
            ? {
                width: "100%",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                p: theme.spacing(4, 3, 3, 3),
              }
            : {
                width: "100%",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                borderRadius: 1,
                p: theme.spacing(2),
                border: `1px solid ${
                  checked ? youhaBlue[500] : blueGrey[100]
                } !important`,
                boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                  checked ? `0.08` : `0.08`
                })`,
                cursor: "pointer",
                "& *": {
                  cursor: "pointer",
                },
              }
        }
        onClick={handleClick}
        className={typeof index !== "undefined" ? `CampaignItem-${index}` : ""}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {(sex ? [categories[0], sex, ages[0]] : [categories[0], ages[0]]).map(
            (item, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: 0.5,
                  mr: 0.5,
                  height: 24,
                  p: theme.spacing(0, 1),
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: checked ? youhaBlue[50] : blueGrey[50],
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    fontWeight: "700",
                    color: checked ? youhaBlue[500] : blueGrey[500],
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            )
          )}
        </Box>
        <Typography
          sx={
            inHome
              ? {
                  mt: 1,
                  fontSize: 24,
                  lineHeight: "36px",
                  fontWeight: "700",
                }
              : {
                  mt: 0.5,
                  fontSize: 20,
                  lineHeight: "32px",
                  fontWeight: "700",
                  color: checked ? youhaBlue[500] : blueGrey[900],
                }
          }
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            lineHeight: "20px",
            color: checked ? youhaBlue[500] : blueGrey[700],
          }}
        >
          {description}
        </Typography>
      </ButtonBase>
    </Box>
  );
}
