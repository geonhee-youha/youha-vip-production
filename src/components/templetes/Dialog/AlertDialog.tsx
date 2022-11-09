import { Box, Button, Dialog, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { alertDialogState } from "../../../recoil";
import { theme } from "../../../themes/theme";

export default function AlertDialog() {
  const [alertDialog, setAlertDialog] = useRecoilState(alertDialogState);
  const { open, title, body, cancel, confirm, lottie } = alertDialog;
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  const handleClose = () => {
    setAlertDialog((prev) => {
      return {
        ...prev,
        open: false,
        cancel: {
          ...prev.cancel,
          onClick: () => {},
        },
        confirm: {
          ...prev.confirm,
          onClick: () => {},
        },
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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          position: "relative",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        },
        position: "fixed",
        zIndex: 9999999,
        right: 0,
        overflow: "auto",
      }}
    >
      {lottie && (
        <Box
          sx={{
            position: "relative",
            height: "100%",
          }}
        >
          <lottie-player
            autoplay
            loop
            mode="normal"
            src={lottie}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 48,
              background: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))`,
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          p: theme.spacing(2, 3),
          height: 64,
          display: "flex",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          p: theme.spacing(0, 3, 2, 3),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            lineHeight: "24px",
            color: blueGrey[700],
          }}
        >
          {body}
        </Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{
          p: theme.spacing(2, 3),
        }}
      >
        {!cancel?.hide && (
          <Button
            fullWidth
            onClick={handleClickCancel}
            // variant="text"
            color="secondary"
            sx={{
              height: 40,
              minHeight: 40,
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: "700",
              p: theme.spacing(0, 2),
            }}
          >
            {cancel?.title ?? "취소"}
          </Button>
        )}
        <Button
          fullWidth
          onClick={handleClickConfirm}
          autoFocus
          // variant="text"
          sx={{
            height: 40,
            minHeight: 40,
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "700",
            p: theme.spacing(0, 2),
          }}
        >
          {confirm?.title ?? "확인"}
        </Button>
      </Stack>
    </Dialog>
  );
}
