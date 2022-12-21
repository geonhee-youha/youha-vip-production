import { Typography as Typo, SxProps } from "@mui/material";
import newBlue from "../../core/colors/newBlue";
import newGrey from "../../core/colors/newGrey";
import { fontStyles, TypographyVariantProps } from "../../core/typography";

type TypoProps = {
  variant?: TypographyVariantProps;
  mobileVariant?: TypographyVariantProps;
  textAlign?: "center" | "right" | undefined;
  lines?: number;
  children?: React.ReactNode;
  color?: string;
  fontWeight?: string;
  sx?: SxProps;
  className?: string;
};

export default function Typography({
  variant = "body-1",
  mobileVariant,
  textAlign,
  lines,
  children,
  color = newGrey[900],
  fontWeight,
  sx,
  className,
}: TypoProps) {
  return (
    <Typo
      sx={{
        fontFamily: `LINESeedKR, Pretendard, -apple-system, BlinkMacSystemFont, system- ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo","Noto Sans KR", "Malgun Gothic", sans- serif`,
        ...(fontWeight !== undefined
          ? { ...fontStyles[variant], fontWeight: `${fontWeight} !important` }
          : fontStyles[variant]),
        wordBreak: "keep-all",
        textAlign: textAlign,
        color: color,
        transition: `all 0.35s ease`,
        "@media(max-width: 828px)": {
          ".web": {
            display: "none",
          },
          ...(fontWeight !== undefined
            ? {
                ...fontStyles[mobileVariant ?? variant],
                fontWeight: `${fontWeight} !important`,
              }
            : fontStyles[mobileVariant ?? variant]),
        },
        ".lines": {
          display: "-webkit-box",
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          lineClamp: lines,
          WebkitLineClamp: lines,
          whiteSpace: "pre-line",
          wordBreak: "break-all",
        },
        "& .blue": {
          color: newBlue[500],
        },
        ...sx,
      }}
      className={`${className ?? ""} ${
        typeof lines !== "undefined" ? "lines" : ""
      }`}
    >
      {children}
    </Typo>
  );
}
