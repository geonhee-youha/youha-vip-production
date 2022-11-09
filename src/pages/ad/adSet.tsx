import { alpha, Box, Paper } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import List from "../../components/atoms/List";
import PaperHeader from "../../components/molecules/PaperHeader";
import AdSetItem from "../../components/organisms/AdSetItem";
import { adSetFilters, adSetSorts, pages } from "../../constants";
import { testAdSets } from "../../datas";

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
  const data = testAdSets;
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
          display: "flex",
          flexDirection: "column",
        }}
        className={`PaperTarget-${queryName}`}
      >
        <PaperHeader queryName={queryName} title={<>{pageTitle}</>} big />
        <List
          data={data}
          filters={adSetFilters}
          sorts={adSetSorts}
          spacing={0}
          renderList={(data) => {
            return data.map((item, index) => (
              <AdSetItem key={index} item={item} index={index} />
            ));
          }}
          title="광고세트가"
          sx={{
            borderRadius: 1,
            border: `1px solid ${blueGrey[100]}`,
            boxShadow: `2px 2px 4px 0px ${alpha("#000000", 0.08)}`,
            overflow: "hidden",
          }}
        />
      </Box>
    </Paper>
  );
}
