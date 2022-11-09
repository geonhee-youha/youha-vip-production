import { IconName } from "@fortawesome/fontawesome-svg-core";
import {
  alpha,
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  SxProps,
  Typography,
} from "@mui/material";
import { blueGrey, pink, red } from "@mui/material/colors";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import youhaBlue from "../../themes/youhaBlue";
import Icon from "./Icon";
type TextInputProps = {
  inputRef?: any;
  value: string;
  type?: string;
  label?: React.ReactNode;
  essential?: boolean;
  placeholder?: string;
  multiline?: boolean;
  showButton?: boolean;
  startAdornmentName?: IconName;
  minRows?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  uneditable?: boolean;
  sx?: SxProps;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
};
export default function TextInput({
  inputRef,
  value,
  type,
  label,
  essential,
  placeholder,
  multiline,
  showButton,
  startAdornmentName,
  minRows,
  onChange,
  onReset,
  onKeyPress,
  uneditable,
  sx,
  error,
  helperText,
  disabled,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange !== "undefined") onChange(event);
  };
  const handleClickReset = () => {
    if (typeof onReset !== "undefined") onReset();
  };
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Box sx={{ ...sx }}>
      <FormControl fullWidth variant="filled" error={error}>
        {label && (
          <Typography
            sx={{
              mb: 1,
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: "700",
              "& span": {
                color: youhaBlue[500],
              },
              color: error ? red[500] : blueGrey[900],
            }}
          >
            {label}
            {essential && <span>*</span>}
          </Typography>
        )}
        <FilledInput
          inputRef={inputRef}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          autoComplete="off"
          type={showPassword ? "text" : type}
          multiline={multiline}
          minRows={minRows}
          disabled={uneditable || disabled}
          startAdornment={
            startAdornmentName && (
              <Icon
                name={startAdornmentName}
                prefix="fas"
                size={16}
                sx={{
                  color: blueGrey[300],
                  width: 24,
                  height: 24,
                  p: 0,
                  ml: -0.5,
                  mr: 0.5,
                }}
              />
            )
          }
          endAdornment={
            <>
              {value !== "" && !multiline && type !== "number" && (
                <IconButton
                  tabIndex={-1}
                  onClick={handleClickReset}
                  onMouseDown={handleMouseDown}
                  sx={{
                    width: 24,
                    height: 24,
                    p: 0,
                    mr: -0.5,
                    ml: 1,
                  }}
                  className="reset-button"
                >
                  <Icon
                    name="times-circle"
                    prefix="fas"
                    size={16}
                    sx={{
                      color: blueGrey[300],
                      width: 24,
                      height: 24,
                    }}
                  />
                </IconButton>
              )}
              {showButton && (
                <IconButton
                  tabIndex={-1}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDown}
                  sx={{
                    width: 24,
                    height: 24,
                    p: 0,
                    mr: 3,
                    ml: 1,
                  }}
                >
                  {showPassword ? (
                    <Icon
                      name="eye-slash"
                      prefix="fas"
                      size={20}
                      sx={{
                        color: pink[500],
                        width: 24,
                        height: 24,
                      }}
                    />
                  ) : (
                    <Icon
                      name="eye"
                      prefix="fas"
                      size={20}
                      sx={{
                        color: pink[500],
                        width: 24,
                        height: 24,
                      }}
                    />
                  )}
                </IconButton>
              )}
            </>
          }
          sx={{
            "& *": {
              transition: "all 0.35 ease",
            },
            "&.MuiInputBase-root": {
              p: `12px 16px !important`,
              borderRadius: "8px !important",
              minHeight: 40,
              backgroundColor: `${blueGrey[50]} !important`,
              "&.Mui-disabled": {
                backgroundColor: `${blueGrey[50]} !important`,
                "& input": {
                  color: `${blueGrey[400]} !important`,
                  WebkitTextFillColor: `${blueGrey[900]} !important`,
                  cursor: "default !important",
                },
                "& textarea": {
                  color: `${blueGrey[400]} !important`,
                  WebkitTextFillColor: `${blueGrey[900]} !important`,
                  cursor: "default !important",
                },
              },
              boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                disabled ? 0 : 0.08
              }), ${
                error
                  ? alpha(red[500], 1)
                  : alpha(disabled ? blueGrey[50] : blueGrey[100], 1)
              } 0px 0px 0px 1px inset`,
              "&.Mui-focused": {
                backgroundColor: `${alpha(blueGrey[50], 0)} !important`,
                boxShadow: `${alpha(
                  error ? red[500] : youhaBlue[500],
                  0.24
                )} 2px 2px 4px 0px, ${alpha(
                  error ? red[500] : youhaBlue[500],
                  1
                )} 0px 0px 0px 1px inset`,
              },
              "&:not(.Mui-focused) .reset-button": {
                display: "none",
              },
              "& input": {
                flex: 1,
                minHeight: 24,
                fontSize: 16,
                lineHeight: "24px",
                p: `0 !important`,
                "&::placeholder": {
                  color: blueGrey[300],
                  opacity: 1,
                },
              },
              "& textarea": {
                p: `0 !important`,
                minHeight: 24,
                fontSize: 16,
                lineHeight: "24px",
                "&::placeholder": {
                  color: blueGrey[300],
                  opacity: 1,
                },
              },
              "&::before": {
                display: `none !important`,
              },
              "&::after": {
                display: `none !important`,
              },
            },
          }}
        />
        {helperText && (
          <FormHelperText
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -24,
              m: 0,
              // p: error ? "4px 0" : 0,
              p: "4px 0",
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: "700",
              textAlign: "right",
              color: error ? `${red[500]} !important` : blueGrey[500],
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
