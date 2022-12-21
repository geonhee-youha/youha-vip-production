import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Visual({
  src,
  size = 64,
  width,
  height,
  borderRadius = "8px",
}: {
  src?: any;
  size?: any;
  width?: any;
  height?: any;
  borderRadius?: any;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: borderRadius,
        width: width ?? size,
        height: height ?? size,
        overflow: "hidden",
        backgroundColor: grey[200],
        "& img": {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
        },
      }}
    >
      <img src={src} />
    </Box>
  );
}
