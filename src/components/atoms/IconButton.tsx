import { ButtonBase, SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { KeyboardEvent, useRef } from "react";
import newGrey from "../../core/colors/newGrey";

export default function IconButton({
  children,
  sx,
  onClick,
  variant = "contained",
  borderRadius = "50%",
  size = 32,
  tabIndex,
  mobile,
  web,
}: {
  children?: React.ReactNode;
  sx?: SxProps;
  onClick?: () => void;
  variant?: "outlined" | "contained";
  borderRadius?: string | number;
  size?: number;
  tabIndex?: number;
  mobile?: boolean;
  web?: boolean;
}) {
  const style = {
    outlined: {
      border: `1px solid ${newGrey[200]}`,
    },
    contained: {},
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      if (onClick) {
        onClick();
      }
    }
  };
  const responsiveStyle = mobile
    ? {
        display: "none",
        "@media(max-width: 828px)": {
          display: "flex",
        },
      }
    : {};
  return (
    <ButtonBase
      tabIndex={tabIndex}
      sx={{
        ...style[variant],
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
        borderRadius: borderRadius,
        backgroundColor: "transparent",
        p: 0,
        transition: `all 0.35s ease`,
        "&:hover": {
          ":before": {
            display: "none",
          },
        },
        ...sx,
        ...responsiveStyle,
      }}
      onClick={onClick}
      onKeyDown={handleKeyPress}
    >
      {children}
    </ButtonBase>
  );
}
