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
import { IFiscalDTO } from "dtos/IFiscalDTO";

const CRUDDocFiscal: FC = () => {
  const history = useHistory();

  const [data, setData] = useState<IFiscalDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    await api
      .get("/fiscal")
      .then(async (res: AxiosResponse) => {
        const tmpData: IFiscalDTO[] = [];

        res.data.forEach((dat: any) => {
          const tmpDat = dat;

          tmpDat.dthr_atualizacao = format(
            new Date(tmpDat.dthr_atualizacao),
            "dd/MM/yyyy HH:mm:ss",
          );
          tmpDat.dthr_criacao = format(
            new Date(tmpDat.dthr_criacao),
            "dd/MM/yyyy HH:mm:ss",
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
        .delete(`/fiscal/${row_id}`)
        .then(async (res: AxiosResponse) => {
          toast.success(`Documento ${row_id} deletado com sucesso`);
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
      id: "cod_documento",
      label: "Código",
    },
    {
      id: "cod_n_nfe",
      label: "NFe",
    },
    {
      id: "vlr_total",
      label: "Valor Total",
    },
    {
      id: "des_contato",
      label: "Contato",
    },
    {
      id: "cod_movimento",
      label: "Movimento",
    },
  ];

  return (
    <StyledDefaultBox>
      <StyledStack>
        <Typography sx={{ width: "100%" }} component="h2">
          Documento Fiscal
        </Typography>
        <StyledButton
          onClick={(e) => {
            e.preventDefault();
            history.push("/Logistica/Fiscal");
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
          cod_id="cod_documento"
          link="/Logistica/Fiscal"
          deleteFnc={deleteRow}
        />
      </Listagem>
    </StyledDefaultBox>
  );
};

export default CRUDDocFiscal;
