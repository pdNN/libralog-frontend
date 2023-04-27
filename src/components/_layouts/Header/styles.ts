import { AppBar, AppBarProps, Box, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { headerHeight, sidebarWidth } from "styles/theme";

interface IAppBar extends AppBarProps {
  open?: boolean;
}

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IAppBar>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${sidebarWidth})`,
    marginLeft: `${sidebarWidth}`,
    transition: theme.transitions.create(["margin", "padding", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  height: `${headerHeight}`,
  padding: `5px 0`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledToolbar = styled(Toolbar)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin-left: 15px;
  }
` as typeof Toolbar;

export const ImageContainer = styled(Box)`
  height: calc(${headerHeight} - 10px);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;
  border-radius: 50%;

  padding: 10px;

  img {
    height: 100%;
    object-fit: cover;
  }
` as typeof Box;
