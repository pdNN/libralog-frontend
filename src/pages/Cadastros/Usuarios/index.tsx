import { useState, FC, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { format } from "date-fns";

import { Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import api from "services/api";

import { StyledDefaultBox } from "styles/default";
import { StyledButton, StyledStack } from "../styles";

import Listagem, { ICells } from "components/Listagem";
import ListRow from "components/Listagem/ListRow";

const CRUDUsuarios: FC = () => {
  const history = useHistory();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    await api
      .get("/usuarios")
      .then(async (res: AxiosResponse) => {
        const tmpData: any[] = [];

        res.data.forEach((dat: any) => {
          const tmpDat = dat;

          tmpDat.dthr_atualizacao = format(
            new Date(tmpDat.dthr_atualizacao),
            "dd/mm/yyyy HH:mm:ss",
          );
          tmpDat.dthr_criacao = format(
            new Date(tmpDat.dthr_criacao),
            "dd/mm/yyyy HH:mm:ss",
          );

          tmpData.push(tmpDat);
        });

        setData(tmpData);
      })
      .catch((err: any) => {
        toast.error(
          err.response?.data.message
            ? err.response?.data.message
            : "Ocorreu um erro",
        );
        console.error(`Erro: ${err.response?.data.message}`);
      });
    setLoading(false);
  }, []);

  const deleteRow = useCallback(
    async (row_id: number) => {
      setLoading(true);
      await api
        .delete(`/usuarios/${row_id}`)
        .then(async (res: AxiosResponse) => {
          toast.success(`Usuário ${row_id} deletado com sucesso`);
          getData();
        })
        .catch((err: any) => {
          toast.error(
            err.response?.data.message
              ? err.response?.data.message
              : "Ocorreu um erro",
          );
          console.error(`Erro: ${err.response?.data.message}`);
        });
      setLoading(false);
    },
    [getData],
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const cells: ICells[] = [
    {
      id: "cod_usuario",
      label: "Código",
    },
    {
      id: "nome_usuario",
      label: "Nome",
    },
    {
      id: "email_usuario",
      label: "E-mail",
    },
    {
      id: "perfil.nome_perfil",
      label: "Perfil",
    },
    {
      id: "dthr_atualizacao",
      label: "Dt. Atualização",
    },
    {
      id: "dthr_criacao",
      label: "Dt. Criação",
    },
    {
      id: "distribuidora.nome_distribuidora",
      label: "Distribuidora",
    },
  ];

  return (
    <StyledDefaultBox>
      <StyledStack>
        <Typography sx={{ width: "100%" }} component="h2">
          Usuários
        </Typography>
        <StyledButton
          onClick={(e) => {
            e.preventDefault();
            history.push("/cadastros/usuarios/novo");
          }}
          variant="contained"
        >
          <AddIcon />
          Novo
        </StyledButton>
      </StyledStack>
      <Listagem data={data} loading={loading} cells={cells}>
        <ListRow
          cells={cells}
          cod_id="cod_usuario"
          link="/cadastros/usuarios"
          deleteFnc={deleteRow}
        />
      </Listagem>
    </StyledDefaultBox>
  );
};

export default CRUDUsuarios;
