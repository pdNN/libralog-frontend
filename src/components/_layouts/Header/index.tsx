import { FC } from "react";
import { ImageContainer, StyledAppBar, StyledToolbar } from "./styles";
import { IconButton, Stack, Typography } from "@mui/material";
import { Logout as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material";
import Logo from "assets/libra-logo-220.png";
import { useAuth } from "hooks/auth";
import { useHistory } from "react-router";

interface IHeader {
  open: boolean;
  handleSidebarOpen: () => void;
}

const Header: FC<IHeader> = ({ open, handleSidebarOpen }) => {
  const { signOut, usuario } = useAuth();

  const history = useHistory();

  return (
    <StyledAppBar position="fixed" open={open}>
      <StyledToolbar>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleSidebarOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <ImageContainer component="div">
            <img src={Logo} alt="log" />
          </ImageContainer>
          <Typography component="h1">Olá, {usuario.nome_usuario}</Typography>
        </Stack>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton
            onClick={() => {
              signOut();
              history.push("/login");
            }}
            sx={{ color: "#fff" }}
          >
            <LogoutIcon />
          </IconButton>
        </Stack>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
