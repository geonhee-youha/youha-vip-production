import { Box, SxProps } from "@mui/material";
import { useRef } from "react";

export default function Slide({
  children,
  sx,
}: {
  children?: React.ReactNode;
  sx?: SxProps;
}) {
  // const boxRef = useRef<any>(null);
  // const shadowRef = useRef<any>(null);
  // const handleScroll = (e: any) => {
  //   if (boxRef.current.scrollTop > 0) {
  //     shadowRef.current.style.boxShadow = `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`;
  //   } else {
  //     shadowRef.current.style.boxShadow = ``;
  //   }
  // };
  // return (
  //   <Box
  //     sx={{
  //       flex: 1,
  //       position: "relative",
  //       display: "flex",
  //       flexDirection: "column",
  //       overflow: "hidden",
  //     }}
  //   >
  //     <Box
  //       ref={shadowRef}
  //       sx={{
  //         position: "absolute",
  //         left: 0,
  //         right: 0,
  //         top: -40,
  //         height: 40,
  //         backgroundColor: "#ffffff",
  //         transition: `all 0.35s ease`,
  //         zIndex: 999,
  //       }}
  //     />
  //     <Box
  //       ref={boxRef}
  //       sx={{
  //         position: "relative",
  //         flex: 1,
  //         overflow: "auto",
  //       }}
  //       onScroll={handleScroll}
  //       className="Slide"
  //     >
  //       <Box
  //         sx={{
  //           minHeight: "100%",
  //           pb: 20,
  //           ...sx,
  //         }}
  //       >
  //         {children}
  //       </Box>
  //     </Box>
  //   </Box>
  // );
  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          minHeight: "100%",
          pb: 20,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
