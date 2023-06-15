import { Divider, Typography } from "@mui/material";

import React from "react";

import { StyledBox } from "./styles";
import { useAuth } from "hooks/auth";
import { format } from "date-fns";

const Inicio: React.FC = () => {
  const { usuario } = useAuth();

  return (
    <StyledBox>
      <Typography sx={{ width: "100%" }} component="h1">
        {`Boas vindas ao sistema da sua distribuidora: ${usuario.distribuidora?.nome_distribuidora}!`}
      </Typography>
      <Divider />
      <Typography sx={{ width: "100%" }} component="h2">
        Seus dados:
      </Typography>
      <p>
        Nome: {usuario.nome_usuario}
        <br />
        E-mail: {usuario.email_usuario}
        <br />
        Perfil: {usuario.perfil.nome_perfil}
        <br />
        Data de criação:{" "}
        {format(new Date(usuario.dthr_criacao.toString()), "dd/MM/yyyy k:mm")}
      </p>
    </StyledBox>
  );
};

export default Inicio;
