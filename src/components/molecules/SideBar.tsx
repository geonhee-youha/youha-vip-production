import { alpha, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { blueGrey, cyan, pink } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TabProps } from "../../constants";
import { theme } from "../../themes/theme";
import youhaBlue from "../../themes/youhaBlue";

export default function SideBar({
  color,
  tabs,
  index,
  setIndex,
  title,
  counts,
  disables,
  current,
}: {
  color?: string;
  tabs: TabProps[];
  index?: number;
  setIndex?: Dispatch<SetStateAction<number>>;
  title?: string;
  counts?: any[];
  disables?: number[];
  current?: number;
}) {
  const router = useRouter();
  const currentPathName = `/${router.pathname.split("?")[0].split("/")[1]}`;
  const { value: queryValue } = router.query;
  const tabIndex = Math.max(
    typeof index === "undefined"
      ? _.findIndex(tabs, (el) => el.value === queryValue ?? tabs[0].value)
      : index,
    0
  );
  return (
    <Stack
      spacing={1}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        p: theme.spacing(2, 3),
        borderRight: `1px solid ${blueGrey[100]}`,
        // backgroundColor: blueGrey[50],
        // boxShadow: `2px 2px 4px 0px ${alpha("#000000", 0.08)}`,
        width: 376,
        zIndex: 9999,
        // backgroundColor: "#ffffff",
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          lineHeight: "28px",
          fontWeight: "700",
          mb: 1,
        }}
      >
        진행 프로세스
      </Typography>
      {tabs.map((item, index) => {
        const focused = tabIndex === index;
        const disabled = disables && disables.includes(index);
        const handleClick = () => {
          if (typeof setIndex !== "undefined") {
            setIndex(index);
            return;
          }
          router.push(`${currentPathName}?value=${item.value}`);
        };
        return (
          <TabItem
            key={index}
            index={index}
            item={item}
            focused={focused}
            onClick={handleClick}
            color={color}
            count={counts ? counts[index] : undefined}
            disabled={disabled}
            current={current}
          />
        );
      })}
    </Stack>
  );
}
function TabItem({
  color,
  item,
  index,
  focused,
  onClick,
  count,
  disabled,
  current,
}: {
  color?: string;
  item: TabProps;
  index: number;
  focused: boolean;
  onClick: () => void;
  count?: any;
  disabled?: boolean;
  current?: number;
}) {
  const { title, value, subtitle } = item;
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <ButtonBase
        sx={{
          width: "100%",
          p: 1,
          borderRadius: 1,
          backgroundColor: focused ? youhaBlue[50] : blueGrey[50],
          border: `1px solid ${focused ? youhaBlue[500] : blueGrey[100]}`,
          justifyContent: "flex-start",
          opacity: disabled ? 0.4 : 1,
        }}
        onClick={onClick}
        className={
          value !== ""
            ? `TabItemValue TabItem-${value}`
            : `TabItemIndex TabItem-${index}`
        }
      >
        <Typography
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: focused ? youhaBlue[100] : blueGrey[100],
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 2,
            color: focused ? youhaBlue[500] : blueGrey[900],
          }}
        >
          {index + 1}
        </Typography>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: "700",
              color: focused ? youhaBlue[500] : blueGrey[900],
              span: {
                color: pink[500],
                ml: 0.5,
              },
            }}
          >
            {title}
            {count && count > 0 ? <span>{count}</span> : null}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              color: focused ? youhaBlue[500] : blueGrey[900],
              span: {
                color: pink[500],
                ml: 0.5,
              },
            }}
          >
            {subtitle}
          </Typography>
        </Box>
        {current === index && (
          <Box
            sx={{
              borderRadius: 0.5,
              height: 24,
              p: theme.spacing(0, 1),
              display: "flex",
              alignItems: "center",
              backgroundColor:
                index === 1 ? cyan[50] : index === 4 ? youhaBlue[50] : pink[50],
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                fontWeight: "700",
                color:
                  index === 1
                    ? cyan[500]
                    : index === 4
                    ? youhaBlue[500]
                    : pink[500],
              }}
            >
              현재 상태
            </Typography>
          </Box>
        )}
      </ButtonBase>
    </Box>
  );
}
