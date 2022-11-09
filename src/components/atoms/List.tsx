import {
  alpha,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import _ from "lodash";
import { useState } from "react";
import { FilterProps } from "../../constants";
import { theme } from "../../themes/theme";
import youhaBlue from "../../themes/youhaBlue";

export default function List({
  data,
  sorts,
  filters,
  columns = 3,
  spacing,
  renderList,
  title,
  sx,
}: {
  data: any[];
  sorts: FilterProps[];
  filters: FilterProps[];
  columns?: number;
  spacing?: number;
  renderList: (data: any[]) => React.ReactNode;
  title?: string;
  sx?: SxProps;
}) {
  const [sortValue, setSortValue] = useState<string>(sorts[0].value);
  const [filterValue, setFilterValue] = useState<string>(filters[0].value);
  const handleChangeSortValue = (event: SelectChangeEvent) => {
    setSortValue(event.target.value);
  };
  const handleChangeFilterValue = (event: SelectChangeEvent) => {
    setFilterValue(event.target.value);
  };
  const getListLength = (value: any) => {
    return _.filter(data, (el) => el.status?.value === filterValue).length;
  };
  const sortedList = _.sortBy(data, sortValue).reverse().reverse();
  const list =
    filterValue === ""
      ? sortedList
      : _.filter(sortedList, (el) => el.status?.value === filterValue);
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "relative",
          width: "100%",
          p: theme.spacing(2, 3, 0, 3),
        }}
      >
        <Select
          color="secondary"
          value={filterValue}
          onChange={handleChangeFilterValue}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          IconComponent={() => null}
          sx={{
            backgroundColor: `${"transparent"} !important`,
            height: 40,
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "700",
            color: filterValue !== "" ? youhaBlue[500] : blueGrey[300],
            "& fieldset": {
              borderColor: `${
                filterValue !== "" ? youhaBlue[500] : blueGrey[100]
              } !important`,
              borderWidth: `1px !important`,
              boxShadow: "none !important",
            },
            boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08) !important`,
            "&.Mui-focused": {
              boxShadow: `2px 2px 4px 0px ${alpha(blueGrey[900], 0.24)}`,
            },
            "&:hover *": {
              borderColor: filterValue !== "" ? youhaBlue[500] : blueGrey[900],
            },
            "& .count": {
              ml: 0.5,
              mr: 0.5,
            },
            "& svg": {
              color: filterValue !== "" ? youhaBlue[500] : blueGrey[300],
            },
            "& .MuiSelect-select": {
              pr: `14px !important`,
            },
          }}
        >
          {filters.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.title}
              <span className="count">
                {item.value === ""
                  ? sortedList.length
                  : getListLength(item.value)}
              </span>
            </MenuItem>
          ))}
        </Select>
        <Select
          color="secondary"
          value={sortValue}
          onChange={handleChangeSortValue}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            backgroundColor: `${"transparent"} !important`,
            height: 40,
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "700",
            color: sortValue !== "" ? youhaBlue[500] : blueGrey[300],
            "& fieldset": {
              borderColor: `${
                sortValue !== "" ? youhaBlue[500] : blueGrey[100]
              } !important`,
              borderWidth: `1px !important`,
              boxShadow: "none !important",
            },
            boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, 0.08) !important`,
            "&.Mui-focused": {
              boxShadow: `2px 2px 4px 0px ${alpha(blueGrey[900], 0.24)}`,
            },
            "&:hover *": {
              borderColor: sortValue !== "" ? youhaBlue[500] : blueGrey[900],
            },
            "& svg": {
              color: sortValue !== "" ? youhaBlue[500] : blueGrey[300],
            },
          }}
        >
          {sorts.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Box
        sx={{
          flex: 1,
          position: "relative",
          p: theme.spacing(2, 3, 2, 3),
        }}
      >
        <Stack
          spacing={spacing !== undefined ? spacing : 0}
          sx={
            spacing !== undefined
              ? {
                  ...sx,
                }
              : {
                  display: "grid",
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridAutoColumn: "1fr",
                  gridTemplateRows: "auto",
                  gridRowGap: 16,
                  gridColumnGap: 16,
                  ...sx,
                }
          }
        >
          {renderList(list)}
        </Stack>
      </Box>
      {list.length === 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            bottom: 64,
            backgroundColor: "#ffffff",
            zIndex: 99,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: "700",
              color: blueGrey[300],
              textAlign: "center",
            }}
          >
            해당하는 {title} 없습니다!
          </Typography>
        </Box>
      )}
    </Box>
  );
}
