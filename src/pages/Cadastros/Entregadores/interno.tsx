import { useState, FC, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
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
import { IEntregadorDTO } from "dtos/IEntregadorDTO";

interface ParamsTypes {
  id: string | undefined;
}

const createSchema = z.object({
  nome_entregador: z
    .string({
      required_error: "O nome é obrigatório.",
    })
    .min(1, { message: "O nome deve ser preenchido" }),
  nr_telefone: z
    .string({
      required_error: "Telefone é obrigatório.",
    })
    .min(1, { message: "Telefone deve ser preenchido" }),
  cod_cpf: z
    .string({
      required_error: "CPF é obrigatório.",
    })
    .min(1, { message: "CPF deve ser preenchido" }),
  cod_cnh: z
    .string({
      required_error: "CNH é obrigatório.",
    })
    .min(1, { message: "CNH deve ser preenchido" }),
  des_email: z
    .string({
      required_error: "Email é obrigatório.",
    })
    .min(1, { message: "Email deve ser preenchido" }),
  des_endereco: z
    .string({
      required_error: "Endereço é obrigatório.",
    })
    .min(1, { message: "Endereço deve ser preenchido" }),
  des_bairro: z
    .string({
      required_error: "Bairro é obrigatório.",
    })
    .min(1, { message: "Bairro deve ser preenchido" }),
  nr_endereco: z
    .string({
      required_error: "Número é obrigatório.",
    })
    .min(1, { message: "Número deve ser preenchido" }),
  des_cidade: z
    .string({
      required_error: "Cidade é obrigatório.",
    })
    .min(1, { message: "Cidade deve ser preenchido" }),
  nr_cep: z
    .string({
      required_error: "CEP é obrigatório.",
    })
    .min(1, { message: "CEP deve ser preenchido" }),
});

const updateSchema = z.object({
  nome_entregador: z.string().optional(),
  des_endereco: z.string().optional(),
  nr_endereco: z.string().optional(),
  des_bairro: z.string().optional(),
  des_cidade: z.string().optional(),
  nr_cep: z.string().optional(),
  nr_telefone: z.string().optional(),
  cod_cpf: z.string().optional(),
  cod_cnh: z.string().optional(),
  des_email: z.string().optional(),
});

const CRUDEntregadoresInterno: FC = () => {
  const { id } = useParams<ParamsTypes>();

  const history = useHistory();

  const [data, setData] = useState<IEntregadorDTO>();
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
        .get(`/entregadores/entregador/${id}`)
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

  const deleteRow = useCallback(async () => {
    if (id !== "novo") {
      setLoading(true);

      await api
        .delete(`/entregadores/entregador/${id}`)
        .then(async (res: AxiosResponse) => {
          toast.success(`Entregador ${id} deletado com sucesso`);
          history.push("/cadastros/entregadores");
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
  }, [id, history]);

  const handleSave = useCallback(
    async (data: any) => {
      setLoading(true);

      if (id === "novo") {
        await api
          .post(`/entregadores`, data)
          .then(async (res: AxiosResponse) => {
            toast.success(
              `Entregador #${res.data.cod_entregador} criada com sucesso`,
            );
            history.push(`/cadastros/entregadores/${res.data.cod_entregador}`);
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
          .put(`/entregadores/entregador/${id}`, data)
          .then(async (res: AxiosResponse) => {
            toast.success(
              `Entregador #${res.data.cod_entregador} atualizado com sucesso`,
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
              {id === "novo" ? "Novo Entregador" : `entregador #${id}`}
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
              <StyledGridItem item sm={12} lg={12}>
                <TextFieldElement
                  name="nome_entregador"
                  placeholder="Nome da Entregador"
                  label="Nome"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={10}>
                <TextFieldElement
                  name="des_endereco"
                  placeholder="Endereço"
                  label="Endereço"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={2}>
                <TextFieldElement
                  name="nr_endereco"
                  placeholder="Nº"
                  label="Nº"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={3}>
                <TextFieldElement
                  name="des_bairro"
                  placeholder="Bairro"
                  label="Bairro"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="des_cidade"
                  placeholder="Cidade"
                  label="Cidade"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={3}>
                <TextFieldElement
                  name="nr_cep"
                  placeholder="CEP"
                  label="CEP"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="cod_cpf"
                  placeholder="CPF"
                  label="CPF"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="cod_cnh"
                  placeholder="CNH"
                  label="CNH"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="nr_telefone"
                  placeholder="Telefone"
                  label="Telefone"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="des_email"
                  placeholder="E-mail"
                  label="E-mail"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem
                item
                sm={3}
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

export default CRUDEntregadoresInterno;
