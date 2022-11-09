import { Box, Paper } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import _ from "lodash";
import { Dispatch, SetStateAction, useState } from "react";
import PaperHeader from "../molecules/PaperHeader";
export default function CampaignRightTabItem({
  title,
  index,
  children,
  opens,
  setOpens,
}: {
  title: string;
  index: number;
  children?: React.ReactNode;
  opens: boolean[];
  setOpens: Dispatch<SetStateAction<boolean[]>>;
}) {
  const queryName = `home-${index}`;
  const handleClickClose = () => {
    setOpens((prev) => {
      let prevList = _.cloneDeep(prev);
      prevList[index] = false;
      return prevList;
    });
  };
  const open = opens[index];
  return open ? (
    <Paper
      elevation={4}
      sx={{
        flex: 1,
        boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
        border: `1px solid ${blueGrey[100]}`,
        backgroundColor: "#ffffff",
        borderRadius: 1,
        overflow: "hidden",
        width: `calc((100vw - 16px * 5) / 4)`,
        maxWidth: 340,
        minWidth: 280,
        maxHeight: `calc((100vh - 16px * 3)/2)`,
        minHeight: 72,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
        className={`PaperTarget-${queryName}`}
      >
        <PaperHeader queryName={queryName} title={title} onClose={handleClickClose} />
        {children}
      </Box>
    </Paper>
  ) : null;
}
