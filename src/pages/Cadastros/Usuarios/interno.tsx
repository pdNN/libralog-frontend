import { useState, FC, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AutocompleteElement,
  FormContainer,
  PasswordElement,
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
import { ISelect } from "dtos/IUtils";

interface ParamsTypes {
  id: string | undefined;
}

const createSchema = z.object({
  nome_usuario: z
    .string({
      required_error: "O nome é obrigatório.",
    })
    .min(1, { message: "O nome deve ser preenchido" }),
  email_usuario: z
    .string({
      required_error: "O e-mail é obrigatório.",
    })
    .min(1, { message: "O e-mail deve ser preenchido." })
    .email("E-mail inválido."),
  cod_perfil: z
    .number({
      required_error: "O perfil é obrigatório.",
    })
    .min(0, { message: "O perfil deve ser preenchido." }),
  des_senha: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(1, { message: "Senha deve ser preenchida." }),
  cod_distribuidora: z.number({
    required_error: "Distribuidora é obrigatória",
  }),
});

const updateSchema = z.object({
  nome_usuario: z.string().optional(),
  email_usuario: z.string().email("E-mail inválido.").optional(),
  cod_perfil: z.number().optional(),
  des_senha: z.string().optional(),
  cod_distribuidora: z.number().optional(),
});

const CRUDUsuariosInterno: FC = () => {
  const { id } = useParams<ParamsTypes>();

  const history = useHistory();

  const [data, setData] = useState();
  const [distribuidoras, setDistribuidoras] = useState<ISelect[]>([]);
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

  const getPerfis = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/perfis/`)
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

  const deleteRow = useCallback(async () => {
    if (id !== "novo") {
      setLoading(true);

      await api
        .delete(`/usuarios/usuario/${id}`)
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
            toast.success(
              `Usuário #${res.data.cod_usuario} criado com sucesso`,
            );
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
          .put(`/usuarios/usuario/${id}`, data)
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
              {id === "novo" && (
                <StyledGridItem item sm={12} lg={6}>
                  <PasswordElement
                    name="des_senha"
                    placeholder="Senha do usuário"
                    label="Senha"
                    type="password"
                    variant="filled"
                    fullWidth
                  />
                </StyledGridItem>
              )}
              <StyledGridItem item sm={12} lg={6}>
                <AutocompleteElement
                  label="Perfil do usuário"
                  matchId
                  name="cod_perfil"
                  options={[
                    {
                      id: 1,
                      label: "Inicial",
                    },
                    {
                      id: 2,
                      label: "Super",
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
