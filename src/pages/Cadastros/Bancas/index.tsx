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
import { IBancaDTO } from "dtos/IBancaDTO";

const CRUDBancas: FC = () => {
  const history = useHistory();

  const [data, setData] = useState<IBancaDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    await api
      .get("/bancas")
      .then(async (res: AxiosResponse) => {
        const tmpData: IBancaDTO[] = [];

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
        .delete(`/bancas/banca/${row_id}`)
        .then(async (res: AxiosResponse) => {
          toast.success(`Banca ${row_id} deletada com sucesso`);
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
      id: "cod_banca",
      label: "Código",
    },
    {
      id: "nome_banca",
      label: "Nome",
    },
    {
      id: "des_razao_social",
      label: "Razão Social",
    },
    {
      id: "des_contato",
      label: "Contato",
    },
    {
      id: "nr_telefone",
      label: "Telefone",
    },
    {
      id: "cod_cnpj",
      label: "CNPJ",
    },
    {
      id: "cod_insc_estadual",
      label: "Inscrição Estatual",
    },
    {
      id: "des_email",
      label: "E-mail",
    },
  ];

  return (
    <StyledDefaultBox>
      <StyledStack>
        <Typography sx={{ width: "100%" }} component="h2">
          Bancas
        </Typography>
        <StyledButton
          onClick={(e) => {
            e.preventDefault();
            history.push("/cadastros/bancas/novo");
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
          cod_id="cod_banca"
          link="/cadastros/bancas"
          deleteFnc={deleteRow}
        />
      </Listagem>
    </StyledDefaultBox>
  );
};

export default CRUDBancas;
