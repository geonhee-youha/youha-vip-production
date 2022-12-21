import { alpha, Box, InputBase, Stack } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import newBlue from "../../core/colors/newBlue";
import newGrey from "../../core/colors/newGrey";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";
import IconButton from "../atoms/IconButton";
import Typography from "./Typography";

export default function TextField({
  type = "text",
  value,
  label,
  placeholder,
  onChange,
  onReset,
  onKeyPress,
  minRows,
}: {
  type?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  minRows?: number;
}) {
  const ref = useRef<any>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const passwordShowIconName = passwordShow ? "eye-slash" : "eye";
  const multiline = minRows && minRows > 0 ? true : false;
  const borderColor = focused ? newBlue[500] : "transparent";
  const backgroundColor = focused ? "#ffffff" : newGrey[100];
  const iconColor = focused ? newGrey[900] : newGrey[300];
  const handleClickReset = () => {
    if (typeof onReset !== "undefined") onReset();
  };
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (typeof onKeyPress !== "undefined") {
      if (event.key == "Enter") {
        ref.current.blur();
        onKeyPress(event);
      }
    }
  };
  const handleClickPasswordShow = () => {
    setPasswordShow((prev) => !prev);
  };
  const handleFocusInput = (focused: boolean) => {
    setFocused(focused);
  };
  return (
    <Stack spacing={1}>
      {label && <Typography color={newGrey[900]}>{label}</Typography>}
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <InputBase
          autoComplete="off"
          autoCapitalize="off"
          inputRef={ref}
          type={passwordShow ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => handleFocusInput(true)}
          onBlur={() => handleFocusInput(false)}
          onKeyPress={handleKeyPress}
          multiline={multiline}
          minRows={minRows}
          endAdornment={
            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                p: theme.spacing(1.5, 2),

                zIndex:
                  focused || (value && value !== "") || type === "password"
                    ? 1
                    : -1,
              }}
            >
              <IconButton
                tabIndex={-1}
                size={24}
                onClick={handleClickReset}
                sx={{
                  opacity: focused || (value && value !== "") ? 1 : 0,
                }}
              >
                <Icon
                  prefix="fas"
                  size={20}
                  name="times-circle"
                  color={iconColor}
                />
              </IconButton>
              {type === "password" && (
                <IconButton
                  tabIndex={-1}
                  size={24}
                  onClick={handleClickPasswordShow}
                >
                  <Icon
                    prefix="fas"
                    size={20}
                    name={passwordShowIconName}
                    color={iconColor}
                  />
                </IconButton>
              )}
            </Stack>
          }
          sx={{
            width: "100%",
            borderRadius: 0.5,
            overflow: "hidden",
            boxShadow: `0px 0px 0px 1px ${borderColor} inset`,
            backgroundColor: backgroundColor,
            p: theme.spacing(
              1.5,
              2 +
                (focused || (value && value !== "")
                  ? type === "password"
                    ? 8
                    : 4
                  : 0),
              1.5,
              2
            ),
            input: {
              width: "100%",
              fontSize: 16,
              lineHeight: "24px",
              caretColor: newBlue[500],
              "&::placeholder": {
                color: `${newGrey[400]} !important`,
                opacity: 1,
              },
            },
            transition: `all 0.35s ease`,
          }}
        />
      </Box>
    </Stack>
  );
}
