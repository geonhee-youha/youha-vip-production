import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import Icon from "../../components/atoms/Icon";
import List from "../../components/atoms/List";
import PaperHeader from "../../components/molecules/PaperHeader";
import CreatorItem from "../../components/organisms/CreatorItem";
import {
  ageFilter,
  creatorFilters,
  creatorSorts,
  FilterProps,
  pages,
  sexFilter,
  subscriberFilter,
} from "../../constants";
import { testCreators } from "../../datas";
import { theme } from "../../themes/theme";
import youhaBlue from "../../themes/youhaBlue";
export default function Page() {
  const router = useRouter();
  const currentPathName = `/${router.pathname.split("?")[0].split("/")[1]}`;
  const currentSlugPathName = `/${router.pathname.split("?")[0].split("/")[2]}`;
  const pageTitle =
    currentSlugPathName !== "/undefined"
      ? _.findLast(
          _.findLast(pages, (el) => el.pathName === currentPathName)?.slugs,
          (el) => el.pathName === currentSlugPathName
        )?.title
      : _.findLast(pages, (el) => el.pathName === currentPathName)?.title;
  const queryName = `page-${currentPathName.replace("/", "")}`;
  const [sexFilters, setSexFilters] = useState<FilterProps[]>([]);
  const [ageFilters, setAgeFilters] = useState<FilterProps[]>([]);
  const [subscriberFilters, setSubscriberFilters] = useState<FilterProps[]>([]);
  const data = testCreators;
  return (
    <Paper
      elevation={4}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 1,
        boxShadow: `4px 4px 8px 4px rgba(0, 0, 0, 0.08)`,
        overflow: "hidden",
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
        <PaperHeader queryName={queryName} title={pageTitle} big />
        <Stack
          sx={{
            p: theme.spacing(2, 2, 1, 2),
          }}
        >
          <Filter iconName="people" title="성별">
            {[{ value: "", title: "전체" }, ...sexFilter].map((item, index) => {
              const checked =
                item.value === ""
                  ? sexFilters.length === 0
                  : sexFilters.flatMap((el) => el.value).includes(item.value);
              const handleClick = () => {
                if (item.value === "") {
                  setSexFilters([]);
                } else {
                  setSexFilters((prev) => {
                    let prevList = _.cloneDeep(prev);
                    if (
                      prevList.flatMap((el) => el.value).includes(item.value)
                    ) {
                      prevList = _.filter(
                        prevList,
                        (el) => el.value !== item.value
                      );
                    } else {
                      prevList = [...prevList, item];
                    }
                    return prevList;
                  });
                }
              };
              return (
                <Button
                  key={index}
                  variant="outlined"
                  color={checked ? "primary" : "secondary"}
                  sx={{
                    p: theme.spacing(0, 1.25),
                    height: 32,
                    minHeight: 32,
                    border: `1px solid ${
                      checked ? youhaBlue[500] : blueGrey[100]
                    } !important`,
                    boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                      checked ? `0.08` : `0.08`
                    })`,
                    borderRadius: 1,
                  }}
                  onClick={handleClick}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: "700",
                      color: checked ? youhaBlue[500] : blueGrey[300],
                    }}
                  >
                    {item.title}
                  </Typography>
                </Button>
              );
            })}
          </Filter>
          <Filter iconName="calendar" title="연령">
            {[{ value: "", title: "전체" }, ...ageFilter].map((item, index) => {
              const checked =
                item.value === ""
                  ? ageFilters.length === 0
                  : ageFilters.flatMap((el) => el.value).includes(item.value);
              const handleClick = () => {
                if (item.value === "") {
                  setAgeFilters([]);
                } else {
                  setAgeFilters((prev) => {
                    let prevList = _.cloneDeep(prev);
                    if (
                      prevList.flatMap((el) => el.value).includes(item.value)
                    ) {
                      prevList = _.filter(
                        prevList,
                        (el) => el.value !== item.value
                      );
                    } else {
                      prevList = [...prevList, item];
                    }
                    return prevList;
                  });
                }
              };
              return (
                <Button
                  key={index}
                  variant="outlined"
                  color={checked ? "primary" : "secondary"}
                  sx={{
                    p: theme.spacing(0, 1.25),
                    height: 32,
                    minHeight: 32,
                    border: `1px solid ${
                      checked ? youhaBlue[500] : blueGrey[100]
                    } !important`,
                    boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                      checked ? `0.08` : `0.08`
                    })`,
                    borderRadius: 1,
                  }}
                  onClick={handleClick}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: "700",
                      color: checked ? youhaBlue[500] : blueGrey[300],
                    }}
                  >
                    {item.title}
                  </Typography>
                </Button>
              );
            })}
          </Filter>
          <Filter iconName="users" title="구독자">
            {[{ value: "", title: "전체" }, ...subscriberFilter].map(
              (item, index) => {
                const checked =
                  item.value === ""
                    ? subscriberFilters.length === 0
                    : subscriberFilters
                        .flatMap((el) => el.value)
                        .includes(item.value);
                const handleClick = () => {
                  if (item.value === "") {
                    setSubscriberFilters([]);
                  } else {
                    setSubscriberFilters((prev) => {
                      let prevList = _.cloneDeep(prev);
                      if (
                        prevList.flatMap((el) => el.value).includes(item.value)
                      ) {
                        prevList = _.filter(
                          prevList,
                          (el) => el.value !== item.value
                        );
                      } else {
                        prevList = [...prevList, item];
                      }
                      return prevList;
                    });
                  }
                };
                return (
                  <Button
                    key={index}
                    variant="outlined"
                    color={checked ? "primary" : "secondary"}
                    sx={{
                      p: theme.spacing(0, 1.25),
                      height: 32,
                      minHeight: 32,
                      border: `1px solid ${
                        checked ? youhaBlue[500] : blueGrey[100]
                      } !important`,
                      boxShadow: `2px 2px 4px 0px rgba(0, 0, 0, ${
                        checked ? `0.08` : `0.08`
                      })`,
                      borderRadius: 1,
                    }}
                    onClick={handleClick}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                        fontWeight: "700",
                        color: checked ? youhaBlue[500] : blueGrey[300],
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Button>
                );
              }
            )}
          </Filter>
        </Stack>
        <List
          data={data}
          filters={creatorFilters}
          sorts={creatorSorts}
          columns={3}
          renderList={(data) => {
            return data.map((item, index) => (
              <CreatorItem key={index} item={item} />
            ));
          }}
          title="크리에이터가"
        />
      </Box>
    </Paper>
  );
}
function Filter({
  iconName,
  title,
  children,
}: {
  iconName: IconName;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          minWidth: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Icon
          prefix="fad"
          name={iconName}
          size={20}
          sx={{
            maxWidth: 24,
            mr: 2,
            color: blueGrey[900],
          }}
        />
        <Typography
          sx={{
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: "700",
            color: blueGrey[900],
          }}
        >
          {title}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        {children}
      </Stack>
    </Box>
  );
}
