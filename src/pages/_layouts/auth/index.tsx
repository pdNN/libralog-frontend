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
  LocalShipping as LocalShippingIcon,
  LibraryBooks as LibraryBooksIcon,
  MenuBook as MenuBookIcon,
  AssignmentInd as AssignmentIndIcon,
  Engineering as EngineeringIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  ArrowOutward as ArrowOutwardIcon,
} from "@mui/icons-material";

interface IAuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);

  const sidebarItens: IItems[] = [
    {
      id: "inicio",
      label: "Início",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      id: "cadastros",
      label: "Cadastros",
      link: "/cadastros",
      icon: <ContentPasteIcon />,
      nested: [
        {
          id: "perfis",
          label: "Perfis",
          link: "/cadastros/perfis",
          icon: <AssignmentIndIcon />,
        },
        {
          id: "distribuidoras",
          label: "Distribuidoras",
          link: "/cadastros/distribuidoras",
          icon: <BusinessIcon />,
        },
        {
          id: "usuarios",
          label: "Usuarios",
          link: "/cadastros/usuarios",
          icon: <PeopleAltRoundedIcon />,
        },
        {
          id: "bancas",
          label: "Bancas",
          link: "/cadastros/bancas",
          icon: <StorefrontIcon />,
        },
        {
          id: "entregadores",
          label: "Entregadores",
          link: "/cadastros/entregadores",
          icon: <LocalShippingIcon />,
        },
        {
          id: "editoras",
          label: "Editoras",
          link: "/cadastros/editoras",
          icon: <LibraryBooksIcon />,
        },
        {
          id: "revistas",
          label: "Revistas",
          link: "/cadastros/revistas",
          icon: <MenuBookIcon />,
        },
      ],
    },
    {
      id: "logistica",
      label: "Logística",
      link: "/logistica",
      icon: <EngineeringIcon />,
      nested: [
        {
          id: "fiscal",
          label: "Fiscal",
          link: "/logistica/fiscal",
          icon: <ArrowForwardIcon />,
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
