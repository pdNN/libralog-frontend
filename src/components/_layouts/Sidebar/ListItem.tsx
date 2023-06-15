import { FC, cloneElement, useCallback, useState } from "react";

import {
  ListItem as MUIListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  useTheme,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { IItems } from ".";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useAuth } from "hooks/auth";
import { validateModulePermission } from "utils/utils";

interface IListItem {
  item: IItems;
  isNested?: boolean;
}

const ListItem: FC<IListItem> = ({ item, isNested }) => {
  const theme = useTheme();
  const { usuario } = useAuth();

  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);

  const hasNested = item.nested && item.nested.length > 0;
  let someAllowedNested = false;

  const userAllowedModules = usuario.perfil.permissoes.map(
    (permissao) => permissao.split("_")[0],
  );

  if (item.nested && hasNested) {
    someAllowedNested = item.nested.some((nestedItem) => {
      if (
        userAllowedModules.includes(nestedItem.id) ||
        usuario.perfil.permissoes.includes("super")
      ) {
        return true;
      }
      return false;
    });
  }

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

  return !hasNested || (hasNested && someAllowedNested) ? (
    <>
      <MUIListItem
        key={item.id}
        disablePadding={!isNested}
        sx={{ pl: isNested ? 4 : "auto" }}
      >
        <ListItemButton onClick={handleClick}>
          {item.icon && (
            <ListItemIcon>
              {cloneElement(item.icon as any, {
                sx: { color: theme.palette.primary.main },
              })}
            </ListItemIcon>
          )}
          <ListItemText primary={item.label} />
          {hasNested && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </MUIListItem>
      {hasNested && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.nested?.map((nestedItem) => {
              if (
                validateModulePermission(
                  nestedItem.id,
                  usuario.perfil.permissoes,
                )
              ) {
                return (
                  <ListItem key={nestedItem.id} item={nestedItem} isNested />
                );
              }
              return undefined;
            })}
          </List>
        </Collapse>
      )}
    </>
  ) : (
    <></>
  );
};

export default ListItem;
