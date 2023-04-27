import React from "react";

import { useHistory } from "react-router";
import { Container } from "./styles";

const Pag404: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <h1>Essa página ainda não existe</h1>
      <h2>:(</h2>

      <span onClick={() => history.goBack()}>
        Voltar para a página anterior
      </span>
    </Container>
  );
};

export default Pag404;
