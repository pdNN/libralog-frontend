import { useState, FC, useCallback, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  SwitchElement,
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
  StyledCard,
  StyledCardHeader,
  StyledCardContent,
} from "../styles";

import loadingSrc from "assets/loading.svg";
import { ICreatePerfilDTO, IPerfilDTO } from "dtos/IPerfisDTO";
import { IPermissionModule } from "dtos/IUtils";

interface ParamsTypes {
  id: string | undefined;
}

const CRUDPerfisInterno: FC = () => {
  const { id } = useParams<ParamsTypes>();

  const history = useHistory();

  const [permissionModuleList, setPermissionModuleList] = useState<
    IPermissionModule[]
  >([]);
  const [data, setData] = useState<IPerfilDTO>();
  const [loading, setLoading] = useState<boolean>(false);

  const formContext = useForm({
    defaultValues: data,
  });

  const { reset } = formContext;

  const profileFields = useMemo(
    () => [
      "cod_perfil",
      "nome_perfil",
      "permissoes",
      "dthr_criacao",
      "dthr_atualizacao",
    ],
    [],
  );

  const getPermissionModuleList = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/perfis/list_permissions`)
      .then(async (res: AxiosResponse) => {
        setPermissionModuleList(res.data);
        reset(data);
      })
      .catch((err: any) => {
        toast.error(
          err.response?.data.message
            ? err.response?.data.message
            : "Ocorreu um erro ao buscar a lista de permissões",
        );
        console.error(`Erro: ${err.response?.data.message}`);
      });

    setLoading(false);
  }, [reset, data]);

  const getData = useCallback(async () => {
    if (id !== "novo") {
      setLoading(true);

      await api
        .get(`/perfis/perfil/${id}`)
        .then(async (res: AxiosResponse) => {
          reset(res.data);

          let finalData: IPerfilDTO = res.data;

          finalData.permissoes?.forEach((permission) => {
            finalData = {
              ...finalData,
              [permission]: true,
            };
          });

          setData(finalData);
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
        .delete(`/perfis/perfil/${id}`)
        .then(async (res: AxiosResponse) => {
          toast.success(`Perfil ${id} deletado com sucesso`);
          history.push("/cadastros/perfis");
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

      const finalData: ICreatePerfilDTO = {
        nome_perfil: data.nome_perfil,
        permissoes: [],
      };

      Object.keys(data).forEach((key) => {
        if (!profileFields.includes(key)) {
          if (data[key]) {
            finalData.permissoes?.push(key);
          }
        }
      });

      console.log(finalData);

      if (id === "novo") {
        await api
          .post(`/perfis`, finalData)
          .then(async (res: AxiosResponse) => {
            toast.success(`Perfil #${res.data.cod_perfil} criado com sucesso`);
            history.push(`/cadastros/perfis/${res.data.cod_perfil}`);
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
          .put(`/perfis/perfil/${id}`, finalData)
          .then(async (res: AxiosResponse) => {
            toast.success(
              `Perfil #${res.data.cod_perfil} atualizado com sucesso`,
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
    [profileFields, history, getData, id],
  );

  useEffect(() => {
    getPermissionModuleList();
  }, [getPermissionModuleList]);

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
              {id === "novo" ? "Novo Perfil" : `Perfil #${id}`}
            </Typography>
          </StyledStack>
          {permissionModuleList.length !== 0 && (
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
                    inputProps={{
                      style: {
                        textTransform: "lowercase",
                      },
                    }}
                    name="nome_perfil"
                    placeholder="Nome do perfil"
                    label="Nome"
                    variant="filled"
                    fullWidth
                    required
                  />
                </StyledGridItem>
                <StyledGridItem item sm={12} lg={12}>
                  <Typography component="h2" sx={{ fontSize: 18 }}>
                    Permissões:
                  </Typography>
                </StyledGridItem>
                <StyledGridItem item sm={12} lg={12}>
                  <StyledGrid container spacing={2}>
                    {permissionModuleList.map(
                      (perm_module: IPermissionModule) => (
                        <StyledGridItem
                          key={perm_module.module}
                          item
                          sm={12}
                          lg={6}
                        >
                          <StyledCard>
                            <StyledCardHeader title={perm_module.module} />
                            <StyledCardContent>
                              <StyledGrid container spacing={2}>
                                {perm_module.permissions.map(
                                  (permission: string) => (
                                    <StyledGridItem
                                      key={`${perm_module.module}_${permission}`}
                                      item
                                      sm={12}
                                      lg={6}
                                    >
                                      <SwitchElement
                                        name={`${perm_module.module}_${permission}`}
                                        label={`${perm_module.module}_${permission}`}
                                      />
                                    </StyledGridItem>
                                  ),
                                )}
                              </StyledGrid>
                            </StyledCardContent>
                          </StyledCard>
                        </StyledGridItem>
                      ),
                    )}
                  </StyledGrid>
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
          )}
        </>
      )}
    </StyledDefaultBox>
  );
};

export default CRUDPerfisInterno;
