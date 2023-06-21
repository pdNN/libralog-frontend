import { useState, FC, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  TextFieldElement,
  AutocompleteElement,
} from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Stack, Typography } from "@mui/material";

import api from "services/api";

import { StyledDefaultBox } from "styles/default";
import {
  StyledButton,
  StyledGrid,
  StyledGridItem,
  StyledStack,
} from "../styles";

import loadingSrc from "assets/loading.svg";
import { ISelect } from "dtos/IUtils";
import { IFiscalDTO } from "dtos/IFiscalDTO";

interface ParamsTypes {
  id: string | undefined;
}

const createSchema = z.object({
  cod_n_nfe: z
    .number({
      required_error: "Nfe é obrigatório.",
    })
    .min(1, { message: "Nfe deve ser preenchido" }),
  nr_quantidade: z
    .number({
      required_error: "quantidade é obrigatório.",
    })
    .min(1, { message: "quantidade deve ser preenchido" }),
  vlr_unitario: z
    .number({
      required_error: "Valor Unitario é obrigatório.",
    })
    .min(1, { message: "Valor Unitario deve ser preenchido" }),
  vlr_total: z
    .number({
      required_error: "Valor total é obrigatório.",
    })
    .min(1, { message: "Valor total deve ser preenchido" }),
  dthr_documento: z.date({
    required_error: "Data documento é obrigatório.",
  }),
  cod_editora: z
    .number({
      required_error: "Editora é obrigatório.",
    })
    .min(1, { message: "Editora deve ser preenchido" }),
  cod_revista: z
    .number({
      required_error: "Revista é obrigatório.",
    })
    .min(1, { message: "Revista deve ser preenchido" }),
  cod_movimento: z
    .number({
      required_error: "Movimento é obrigatório.",
    })
    .min(1, { message: "Movimento deve ser preenchido" }),
  cod_entregador: z
    .number({
      required_error: "Entregador é obrigatório.",
    })
    .min(1, { message: "Entregador deve ser preenchido" }),
  cod_banca: z
    .number({
      required_error: "Banca é obrigatório.",
    })
    .min(1, { message: "Banca deve ser preenchido" }),
  cod_distribuidora: z
    .number({
      required_error: "Distribuidora é obrigatório.",
    })
    .min(1, { message: "Distribuidora deve ser preenchido" }),
});

const updateSchema = z.object({
  cod_n_nfe: z.number().optional(),
  nr_quantidade: z.number().optional(),
  vlr_unitario: z.number().optional(),
  vlr_total: z.number().optional(),
  dthr_documento: z.date().optional(),
  cod_editora: z.number().optional(),
  cod_revista: z.number().optional(),
  cod_movimento: z.number().optional(),
  cod_entregador: z.number().optional(),
  cod_banca: z.number().optional(),
  cod_distribuidora: z.number().optional(),
});

const CRUDDocFicalInterno: FC = () => {
  const { id } = useParams<ParamsTypes>();

  const history = useHistory();

  const [data, setData] = useState<IFiscalDTO>();
  const [editoras, setEditoras] = useState<ISelect[]>([]);
  const [revistas, setRevistas] = useState<ISelect[]>([]);
  const [movimento, setMovimento] = useState<ISelect[]>([]);
  const [bancas, setBancas] = useState<ISelect[]>([]);
  const [distribuidoras, setDistribuidoras] = useState<ISelect[]>([]);
  const [entregadores, setEntregadores] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const formContext = useForm({
    defaultValues: data,
    resolver: zodResolver(id === "novo" ? createSchema : updateSchema),
  });

  const { reset } = formContext;

  const getData = useCallback(async () => {
    if (id !== "novo") {
      setLoading(true);

      await api
        .get(`/fiscal/${id}`)
        .then(async (res: AxiosResponse) => {
          reset(res.data);
          setData(res.data);
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
    }
  }, [id, reset]);

  const getDistribuidoras = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/distribuidoras`)
      .then(async (res: AxiosResponse) => {
        const dists = res.data.map((dat: any) => ({
          id: dat.cod_distribuidora,
          label: dat.nome_distribuidora,
        }));

        setDistribuidoras(dists);
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

  const getEntregadores = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/entregadores`)
      .then(async (res: AxiosResponse) => {
        const dists = res.data.map((dat: any) => ({
          id: dat.cod_entregador,
          label: dat.nome_entregador,
        }));

        setEntregadores(dists);
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

  const getEditoras = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/editoras`)
      .then(async (res: AxiosResponse) => {
        const dists = res.data.map((dat: any) => ({
          id: dat.cod_editora,
          label: dat.nome_editora,
        }));

        setEditoras(dists);
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

  const getRevistas = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/revistas`)
      .then(async (res: AxiosResponse) => {
        const dists = res.data.map((dat: any) => ({
          id: dat.cod_revista,
          label: dat.nome_revista,
        }));

        setRevistas(dists);
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

  const getBancas = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/bancas`)
      .then(async (res: AxiosResponse) => {
        const dists = res.data.map((dat: any) => ({
          id: dat.cod_banca,
          label: dat.nome_banca,
        }));

        setBancas(dists);
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

  const getMovimento = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/movimento`)
      .then(async (res: AxiosResponse) => {
        const dists = res.data.map((dat: any) => ({
          id: dat.cod_movimento,
          label: dat.nome_movimento,
        }));

        setMovimento(dists);
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

  const handleSave = useCallback(
    async (data: any) => {
      setLoading(true);

      if (id === "novo") {
        await api
          .post(`/fiscal`, data)
          .then(async (res: AxiosResponse) => {
            toast.success(
              `Documento Fiscal #${res.data.cod_documento} criada com sucesso`,
            );
            history.push(`/logistica/fiscal/${res.data.cod_documento}`);
          })
          .catch((err: any) => {
            toast.error(
              err.response?.data.message
                ? err.response?.data.message
                : "Ocorreu um erro",
            );
            console.error(`Erro: ${err.response?.data.message}`);
          });
      } else {
        await api
          .put(`/fiscal/${id}`, data)
          .then(async (res: AxiosResponse) => {
            toast.success(
              `Documento Fiscal #${res.data.cod_documento} atualizado com sucesso`,
            );
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
      }

      setLoading(false);
    },
    [history, getData, id],
  );

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getDistribuidoras();
  }, [getDistribuidoras]);

  useEffect(() => {
    getEntregadores();
  }, [getEntregadores]);

  useEffect(() => {
    getEditoras();
  }, [getEditoras]);

  useEffect(() => {
    getRevistas();
  }, [getRevistas]);

  useEffect(() => {
    getBancas();
  }, [getBancas]);

  useEffect(() => {
    getMovimento();
  }, [getMovimento]);

  return (
    <StyledDefaultBox>
      {loading ? (
        <Stack
          sx={{ width: "100%" }}
          alignItems="center"
          justifyContent="center"
        >
          <img
            alt="loading"
            style={{
              margin: "0.2rem auto auto",
            }}
            src={loadingSrc}
          />
        </Stack>
      ) : (
        <>
          <StyledStack>
            <Typography sx={{ width: "100%" }} component="h2">
              {id === "novo"
                ? "Nova Documento Fiscal"
                : `Documento Fiscal #${id}`}
            </Typography>
          </StyledStack>
          <FormContainer
            formContext={formContext}
            onSuccess={handleSave}
            FormProps={{
              style: {
                width: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <StyledGrid container spacing={2}>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="cod_n_nfe"
                  placeholder="Nfe"
                  label="Nfe"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="nr_quantidade"
                  placeholder="Quantidade"
                  label="Quantidade"
                  type="number"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={10}>
                <TextFieldElement
                  name="vlr_unitario"
                  placeholder="vlr unitario"
                  label="vlr unitario"
                  type="number"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={2}>
                <TextFieldElement
                  name="vlr_total"
                  placeholder="vlr total"
                  label="vlr total"
                  type="number"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={3}>
                <TextFieldElement
                  name="dthr_documento"
                  placeholder="Dt Doc"
                  label="Dt Doc"
                  type="date"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Distribuidora"
                  matchId
                  name="cod_distribuidora"
                  options={distribuidoras}
                  textFieldProps={{
                    variant: "filled",
                  }}
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Editora"
                  matchId
                  name="cod_editora"
                  options={editoras}
                  textFieldProps={{
                    variant: "filled",
                  }}
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Revista"
                  matchId
                  name="cod_revista"
                  options={revistas}
                  textFieldProps={{
                    variant: "filled",
                  }}
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Movimento"
                  matchId
                  name="cod_Movimento"
                  options={movimento}
                  textFieldProps={{
                    variant: "filled",
                  }}
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Banca"
                  matchId
                  name="cod_banca"
                  options={bancas}
                  textFieldProps={{
                    variant: "filled",
                  }}
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Entregador"
                  matchId
                  name="cod_entregador"
                  options={entregadores}
                  textFieldProps={{
                    variant: "filled",
                  }}
                />
              </StyledGridItem>
              <StyledGridItem
                item
                sm={12}
                display="flex"
                justifyContent="center"
              >
                <StyledButton variant="contained" type="submit" fullWidth>
                  Salvar
                </StyledButton>
              </StyledGridItem>
            </StyledGrid>
          </FormContainer>
        </>
      )}
    </StyledDefaultBox>
  );
};

export default CRUDDocFicalInterno;
