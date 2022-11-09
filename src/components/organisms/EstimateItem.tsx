import { alpha, Box, ButtonBase, Typography } from "@mui/material";
import { blueGrey, pink } from "@mui/material/colors";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { EstimateProps, testAdSets, testCampaigns } from "../../datas";
import { estimateDialogState } from "../../recoil";
import { theme } from "../../themes/theme";
import Typo from "../atoms/Typo";

export default function EstimateItem({
  item,
  index,
}: {
  item: EstimateProps;
  index?: number;
}) {
  const [estimateDialog, setEstimateDialog] =
    useRecoilState(estimateDialogState);
  const { id, campaignId, createdAt, status, adSetIds } = item;
  const campaign =
    testCampaigns[_.findIndex(testCampaigns, (el) => el.id === campaignId)];
  const arrived = status.value !== "0";
  const read = status.value === "2";
  const adSets = _.filter(testAdSets, (el) => adSetIds.includes(el.id));
  const handleClick = () => {
    setEstimateDialog((prev) => {
      return {
        ...prev,
        open: true,
        id: id,
        index: arrived ? 1 : 0
      };
    });
  };
  return (
    <ButtonBase
      sx={
        arrived
          ? {
              width: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              overflow: "hidden",
              "& *": {
                cursor: "pointer",
              },
              cursor: "pointer",
              border: `1px solid${blueGrey[100]}`,
              boxShadow: `2px 2px 4px 0px ${alpha("#000000", 0.08)}`,
              borderRadius: 1,
              p: 2,
            }
          : {
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
              pl: 2,
              pr: 2,
            }
      }
      onClick={handleClick}
    >
      {arrived && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mb: 1,
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
              backgroundColor: read ? blueGrey[50] : pink[50],
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                fontWeight: "700",
                color: read ? blueGrey[500] : pink[500],
              }}
            >
             {read ? '열람' : '미열람'}
            </Typography>
          </Box>
        </Box>
      )}
      <Typo
        lines={2}
        sx={{
          flex: 1,
          fontSize: 16,
          lineHeight: "24px",
          fontWeight: "700",
          wordBreak: "break-all",
        }}
      >
        {arrived
          ? `${adSets[0].title} 외 ${adSets.length - 1}개의 믹스 견적서`
          : `${createdAt} ${campaign.title} 요청건`}
      </Typo>
      {arrived && (
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
          {campaign.description}
        </Typo>
      )}
      <Typo
        lines={2}
        sx={{
          mt: arrived ? 1 : 0,
          fontSize: 14,
          lineHeight: "20px",
          color: blueGrey[500],
        }}
      >
        {createdAt}
      </Typo>
    </ButtonBase>
  );
}
