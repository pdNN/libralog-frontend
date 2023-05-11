import { useState, FC, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";

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

interface ParamsTypes {
  id: string | undefined;
}

const CRUDBancasInterno: FC = () => {
  const { id } = useParams<ParamsTypes>();
  console.log(id);
  const history = useHistory();

  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const formContext = useForm({
    defaultValues: data,
  });

  const { reset } = formContext;

  const getData = useCallback(async () => {
    if (id !== "novo") {
      setLoading(true);

      await api
        .get(`/bancas/${id}`)
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
        .delete(`/bancas/${id}`)
        .then(async (res: AxiosResponse) => {
          toast.success(`Banca ${id} deletada com sucesso`);
          history.push("/cadastros/bancas");
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
          .post(`/bancas`, data)
          .then(async (res: AxiosResponse) => {
            toast.success(`Banca #${res.data.cod_banca} criada com sucesso`);
            history.push(`/cadastros/bancas/${res.data.cod_banca}`);
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
          .put(`/bancas/${id}`, data)
          .then(async (res: AxiosResponse) => {
            toast.success(
              `Banca #${res.data.cod_banca} atualizada com sucesso`,
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
              {id === "novo" ? "Nova Banca" : `Banca #${id}`}
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
                  name="nome_banca"
                  placeholder="Nome da Banca"
                  label="Nome"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="razao_social"
                  placeholder="Razão Social"
                  label="Razão Social"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={3}>
                <TextFieldElement
                  name="tipo"
                  placeholder="Tipo"
                  label="Tipo"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={7}>
                <TextFieldElement
                  name="endereco"
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
                  name="numero"
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
                  name="bairro"
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
                  name="cidade"
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
                  name="cep"
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
                  name="cnpj"
                  placeholder="CNPJ"
                  label="CNPJ"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="insc_estadual"
                  placeholder="Inscrição Estadual"
                  label="Inscrição Estadual"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={4}>
                <TextFieldElement
                  name="contato"
                  placeholder="Contato"
                  label="Contato"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={4}>
                <TextFieldElement
                  name="telefone"
                  placeholder="Telefone"
                  label="Telefone"
                  type="string"
                  variant="filled"
                  fullWidth
                  required
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={4}>
                <TextFieldElement
                  name="email"
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

export default CRUDBancasInterno;
