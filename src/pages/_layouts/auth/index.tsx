import { FC, ReactNode, useState } from "react";

import Sidebar, { IItems } from "components/_layouts/Sidebar";
import { StyledWrapper, StyledMainContainer } from "../styles";
import Header from "components/_layouts/Header";
import { StyledDrawerHeader } from "components/_layouts/Sidebar/styles";
import {
  Business as BusinessIcon,
  ContentPaste as ContentPasteIcon,
  Home as HomeIcon,
  PeopleAltRounded as PeopleAltRoundedIcon,
  Storefront as StorefrontIcon,
} from "@mui/icons-material";

interface IAuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const sidebarItens: IItems[] = [
    {
      id: "inicio",
      label: "Início",
      link: "/",
      icon: <HomeIcon />,
      profile: 0,
    },
    {
      id: "cadastros",
      label: "Cadastros",
      link: "/cadastros",
      icon: <ContentPasteIcon />,
      profile: 1,
      nested: [
        {
          id: "distribuidoras",
          label: "Distribuidoras",
          link: "/cadastros/distribuidoras",
          icon: <BusinessIcon />,
          profile: 1,
        },
        {
          id: "usuarios",
          label: "Usuarios",
          link: "/cadastros/usuarios",
          icon: <PeopleAltRoundedIcon />,
          profile: 1,
        },
        {
          id: "bancas",
          label: "Bancas",
          link: "/cadastros/bancas",
          icon: <StorefrontIcon />,
          profile: 1,
        },
      ],
    },
  ];

  const handleSidebarOpen = () => {
    setOpen(true);
  };

  const handleSidebarClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledWrapper>
        <Header open={open} handleSidebarOpen={handleSidebarOpen} />
        <Sidebar
          open={open}
          handleSidebarClose={handleSidebarClose}
          items={sidebarItens}
        />
        <StyledMainContainer open={open}>
          <StyledDrawerHeader />
          {children}
        </StyledMainContainer>
      </StyledWrapper>
    </>
  );
};

export default AuthLayout;
