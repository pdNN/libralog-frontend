import { Box, BoxProps, styled } from "@mui/material";
import { sidebarWidth } from "styles/theme";

interface IStyledWrapperContainer extends BoxProps {
  open: boolean;
}

export const StyledWrapper = styled(Box)`
  display: flex;
` as typeof Box;

export const StyledMainContainer = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<IStyledWrapperContainer>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${sidebarWidth}`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
