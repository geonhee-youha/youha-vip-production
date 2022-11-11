import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconLookup,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";
import { Badge, Box, SxProps } from "@mui/material";
import { blueGrey, pink } from "@mui/material/colors";
type IconProps = {
  ref?: any;
  name: IconName;
  prefix?: IconPrefix;
  size?: any;
  padding?: number;
  badgeCount?: number;
  badgeVariant?: "dot" | "standard";
  className?: string;
  color?: string;
  onClick?: (e?: any) => void;
  sx?: SxProps;
};
export default function Icon({
  ref,
  name = "circle",
  prefix = "far",
  size = 20,
  padding = 2,
  badgeCount,
  badgeVariant,
  className,
  color = blueGrey[900],
  onClick,
  sx,
}: IconProps) {
  const invisible = typeof badgeCount !== "number";
  const icon: IconLookup = { prefix: prefix, iconName: name };
  return (
    <Box
      sx={{
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: `${size + padding * 2}px !important`,
        padding: `${padding}px !important`,
        fontSize: `${size / 2}px !important`,
        ...sx,
      }}
      onClick={onClick}
      className="Icon"
    >
      <Badge
        max={999}
        invisible={invisible}
        badgeContent={badgeCount}
        color="error"
        variant={badgeVariant}
        sx={{
          "& .MuiBadge-badge": {
            width: 20,
            height: 20,
            backgroundColor: pink[500],
            fontSize: 12,
            fontWeight: "700",
          },
        }}
      >
        <FontAwesomeIcon icon={icon} size="2x" className={className} />
      </Badge>
    </Box>
  );
}
