import { Box, SxProps } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
export default function Panel({
  children,
  onScroll,
  sx,
}: {
  children?: React.ReactNode;
  onScroll?: any;
  sx?: SxProps;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 1,
        backgroundColor: "#ffffff",
        // overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      onScroll={onScroll}
      className='Panel'
    >
      {children}
    </Box>
  );
}
