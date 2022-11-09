import { Box, Paper } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import List from "../../components/atoms/List";
import PaperHeader from "../../components/molecules/PaperHeader";
import CreatorItem from "../../components/organisms/CreatorItem";
import { creatorFilters, creatorSorts, pages } from "../../constants";
import { testCreators } from "../../datas";
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
