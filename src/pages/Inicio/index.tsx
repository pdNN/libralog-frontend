import { Typography } from "@mui/material";
import React from "react";

import { useHistory } from "react-router";
import { StyledDefaultBox } from "styles/default";

const Inicio: React.FC = () => {
  return (
    <StyledDefaultBox>
      <Typography sx={{ width: "100%" }} component="h2">
        Início
      </Typography>
    </StyledDefaultBox>
  );
};

export default Inicio;
