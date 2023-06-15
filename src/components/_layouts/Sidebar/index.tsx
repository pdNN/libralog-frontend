import { FC, ReactNode } from "react";

import { StyledDrawerHeader } from "./styles";
import { Divider, Drawer, IconButton, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { sidebarWidth } from "styles/theme";
import ListItem from "./ListItem";

export interface IItems {
  id: string;
  label: string;
  link: string;
  icon: ReactNode;
  nested?: IItems[];
}

interface ISidebar {
  open: boolean;
  items: IItems[];
  handleSidebarClose: () => void;
}

const Sidebar: FC<ISidebar> = ({ open, items, handleSidebarClose }) => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <StyledDrawerHeader>
        <IconButton onClick={handleSidebarClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </StyledDrawerHeader>
      <Divider />
      <List>
        {items.map((item, index) => {
          return <ListItem key={item.id} item={item} />;
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
