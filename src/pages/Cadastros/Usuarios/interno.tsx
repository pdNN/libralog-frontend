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

const CRUDUsuariosInterno: FC = () => {
  const { id } = useParams<ParamsTypes>();

  const history = useHistory();

  const [data, setData] = useState();
  const [distribuidoras, setDistribuidoras] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const formContext = useForm({
    defaultValues: data,
  });

  const { reset } = formContext;

  const getData = useCallback(async () => {
    if (id !== "novo") {
      setLoading(true);

      await api
        .get(`/usuarios/${id}`)
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

        console.log(dists);

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

  const deleteRow = useCallback(async () => {
    if (id !== "novo") {
      setLoading(true);

      await api
        .delete(`/usuarios/${id}`)
        .then(async (res: AxiosResponse) => {
          toast.success(`Usuário ${id} deletado com sucesso`);
          history.push("/cadastros/usuarios");
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
          .post(`/usuarios`, data)
          .then(async (res: AxiosResponse) => {
            history.push(`/cadastros/usuarios/${res.data.cod_usuario}`);
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
          .put(`/usuarios/${id}`, data)
          .then(async (res: AxiosResponse) => {
            toast.success(
              `Usuário #${res.data.cod_usuario} atualizado com sucesso`,
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
              {id === "novo" ? "Novo Usuário" : `Usuário #${id}`}
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
                  name="nome_usuario"
                  placeholder="Nome do usuário"
                  label="Nome"
                  variant="filled"
                  fullWidth
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="email_usuario"
                  placeholder="E-mail do usuário"
                  label="E-mail"
                  type="email"
                  variant="filled"
                  fullWidth
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <TextFieldElement
                  name="des_senha"
                  placeholder="Senha do usuário"
                  label="Senha"
                  type="password"
                  variant="filled"
                  fullWidth
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Perfil do usuário"
                  matchId
                  name="cod_perfil"
                  options={[
                    {
                      id: 0,
                      label: "Inicial",
                    },
                    {
                      id: 1,
                      label: "Admin",
                    },
                  ]}
                  textFieldProps={{
                    variant: "filled",
                  }}
                />
              </StyledGridItem>
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Distribuidora do usuário"
                  matchId
                  name="cod_distribuidora"
                  options={distribuidoras}
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

export default CRUDUsuariosInterno;
