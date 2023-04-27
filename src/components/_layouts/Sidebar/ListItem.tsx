import { FC, useCallback, useState } from "react";

import {
  ListItem as MUIListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { IItems } from ".";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface IListItem {
  item: IItems;
  isNested?: boolean;
}

const ListItem: FC<IListItem> = ({ item, isNested }) => {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);

  const hasNested = item.nested && item.nested.length > 0;

  const handleOpenNested = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleClick = useCallback(() => {
    if (hasNested) {
      handleOpenNested();
    } else {
      history.push(item.link);
    }
  }, [item, hasNested, handleOpenNested, history]);

  return (
    <>
      <MUIListItem
        key={item.id}
        disablePadding={!isNested}
        sx={{ pl: isNested ? 4 : "auto" }}
      >
        <ListItemButton onClick={handleClick}>
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.label} />
          {hasNested && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </MUIListItem>
      {hasNested && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.nested?.map((nestedItem) => (
              <ListItem key={nestedItem.id} item={nestedItem} isNested />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default ListItem;
