import { FC, ReactNode } from "react";

import { StyledWrapper } from "../styles";

interface IDefaultLayout {
  children: ReactNode;
}

const DefaultLayout: FC<IDefaultLayout> = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default DefaultLayout;
