import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { testAds, testAdSets, testCreators } from "../../../datas";
import { adDialogState } from "../../../recoil";
import { theme } from "../../../themes/theme";
import Icon from "../../atoms/Icon";
import Typo from "../../atoms/Typo";
import PaperHeader from "../../molecules/PaperHeader";

export default function AdDialog() {
  const [adDialog, setAdDialog] = useRecoilState(adDialogState);
  const {queryName, open, title, body, cancel, confirm, id } = adDialog;
  return id === undefined ? null : <Page />;
}
function Page() {
  const [adDialog, setAdDialog] = useRecoilState(adDialogState);
  const {queryName, open, title, body, cancel, confirm, id } = adDialog;
  const item = testAds[_.findIndex(testAds, (el) => el.id === id)];
  const adSet = testAdSets[_.findIndex(testAdSets, (el) => el.id === item.set.id)];
  const manager = adSet.manager;
  const creator =
    testCreators[_.findIndex(testCreators, (el) => el.id === item.creator.id)];
  const handleClose = () => {
    setAdDialog((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleClickCancel = () => {
    cancel?.onClick();
    handleClose();
  };
  const handleClickConfirm = () => {
    confirm?.onClick();
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="estimate-dialog-title"
      aria-describedby="estimate-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          width: 376 * 2 + 16,
          minWidth: 376 * 2 + 16,
          maxWidth: 376 * 2 + 16,
          height: `calc((100vh - ${24 * 2}px))`,
          maxHeight: `calc((100vh - ${24 * 2}px))`,
        },
        position: "fixed",
        zIndex: 999998,
        right: 0,
        overflow: "auto",
      }}
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
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          className={`PaperTarget-${queryName}`}
        >
          <PaperHeader queryName={queryName} title={"광고 정보"} onClose={handleClose}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: theme.spacing(2, 3, 2, 3),
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 128,
                  height: 128,
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
                sx={{
                  flex: 1,
                  ml: 3,
                }}
              >
                <Typo
                  lines={10}
                  sx={{
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                    color: blueGrey[900],
                  }}
                >
                  {`${
                    testCreators[
                      _.findIndex(
                        testCreators,
                        (el) => el.id === item.creator.id
                      )
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
            </Box>
          </PaperHeader>
        </Box>
      </Paper>
    </Dialog>
  );
}
