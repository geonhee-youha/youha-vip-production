import { Box, SxProps } from "@mui/material";
import Link from "next/link";
import { PageProps } from "../../contants/pages";
import newGrey from "../../core/colors/newGrey";
import { TypographyVariantProps } from "../../core/typography";
import { theme } from "../../themes/theme";
import Typography from "./Typography";

export default function Card({
  item,
  size = "md",
}: {
  size?: "md" | "lg";
  item: PageProps;
}) {
  const { thumbnails, titles, descriptions, href } = item;
  const sizes: {
    [key: string]: {
      titleVariant: TypographyVariantProps;
      titleStyle: SxProps;
      descriptionVariant: TypographyVariantProps;
      descriptionMobileVariant: TypographyVariantProps;
    };
  } = {
    md: {
      titleVariant: "subtitle-1",
      titleStyle: {
        m: theme.spacing(2, 0, 0, 0),
        "@media(max-width: 828px)": {
          m: theme.spacing(1.5, 0, 0, 0),
        },
      },
      descriptionVariant: "body-3",
      descriptionMobileVariant: "body-3",
    },
    lg: {
      titleVariant: "heading-4",
      titleStyle: {
        m: theme.spacing(3, 0, 0, 0),
        "@media(max-width: 828px)": {
          m: theme.spacing(1.5, 0, 0, 0),
        },
      },
      descriptionVariant: "body-2",
      descriptionMobileVariant: "body-3",
    },
  };
  return (
    <Link href={href} passHref>
      <Box
        sx={{
          cursor: "pointer",
          "& > *": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            p: theme.spacing("62.5%", 0, 0, 0),
            border: `1px solid ${newGrey[200]}`,
            overflow: "hidden",
            "& img": {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "cover",
            },
            transition: `all 0.35s ease`,
            ":hover": {
              boxShadow: `0 4px 12px 0 rgba(0, 0, 0, 0.08)`,
              transform: `translateY(-4px)`,
            },
          }}
        >
          <img src={thumbnails ? thumbnails[size] : ""} />
        </Box>
        <Typography
          variant={sizes[size].titleVariant}
          sx={sizes[size].titleStyle}
        >
          {titles["card"]}
        </Typography>
        <Typography
          variant={sizes[size].descriptionVariant}
          mobileVariant={sizes[size].descriptionMobileVariant}
          color={newGrey[600]}
          sx={{
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          {descriptions["card"]}
        </Typography>
      </Box>
    </Link>
  );
}
